import { Status, UserRole } from "../../config/constant.js";
import categorySvc from "./category.service.js";

class CategoryContoller {
  async createCategory(req, res, next) {
    try {
      const payload = await categorySvc.transfromToCategoryData(req);
      const category = await categorySvc.createData(payload);
      res.json({
        data: category,
        message: "Category created",
        status: "CATEGORY_CREATED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  }

  async listAllCategories(req, res, next) {
    try {
      let filter = {};

      if (req.query.status) {
        filter = {
          status: req.query.status,
        };
      }

      if (req.query.search) {
        filter = {
          ...filter,
          $or: [
            { name: new RegExp(req.query.search, "i") },
            { slug: new RegExp(req.query.search, "i") },
          ],
        };
      }

      if (req.query.isFeatured === "true") {
        filter = {
          ...filter,
          isFeatured: true,
        };
      } else if (req.query.isFeatured === "false") {
        filter = {
          ...filter,
          isFeatured: false,
        };
      }

      if (req.query.inMenu === "true") {
        filter = {
          ...filter,
          inMenu: true,
        };
      } else if (req.query.inMenu === "false") {
        filter = {
          ...filter,
          inMenu: false,
        };
      }

      //User Role
      if (req.loginUser.role !== UserRole.ADMIN) {
        filter = {
          ...filter,
          createdBy: req.loginUser._id,
        };
      }

      const paginationFilter = {
        page: +req.query.page || 1,
        limit: +req.query.limit || 15,
      };

      const { data, pagination } = await categorySvc.getAllRowsByFilter(
        filter,
        paginationFilter,
      );

      res.json({
        data: data,
        message: "Category list fetched",
        status: "SUCCESS",
        options: {
          pagination: pagination,
        },
      });
    } catch (exception) {
      next(exception);
    }
  }

  async listAllForPublic(req, res, next) {
    try {
      let filter = {
        status: Status.ACTIVE,
        isFeatured: true,
      };

      if (req.query.search) {
        filter = {
          ...filter,
          $or: [
            { name: new RegExp(req.query.search, "i") },
            { slug: new RegExp(req.query.search, "i") },
          ],
        };
      }

      const paginationFilter = {
        page: +req.query.page || 1,
        limit: +req.query.limit || 15,
      };

      const { data, pagination } = await categorySvc.getAllRowsByFilter(
        filter,
        paginationFilter,
      );

      res.json({
        data: data,
        message: "Category list fetched",
        status: "SUCCESS",
        options: {
          pagination: pagination,
        },
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getCategoryDetailById(req, res, next) {
    try {
      let filter = {
        _id: req.params.categoryId,
      };

      //User Role
      if (req.loginUser.role !== UserRole.ADMIN) {
        filter = {
          ...filter,
          createdBy: req.loginUser._id,
        };
      }

      const categoryDetail = await categorySvc.getSingleRowByFilter(filter);

      res.json({
        data: categoryDetail,
        message: "Category Detail",
        status: "Category_Detail",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  }

  async updateCategoryById(req, res, next) {
    try {
      let filter = {
        _id: req.params.categoryId,
      };

      //User Role
      if (req.loginUser.role !== UserRole.ADMIN) {
        filter = {
          ...filter,
          createdBy: req.loginUser._id,
        };
      }

      const categoryDetail = await categorySvc.getSingleRowByFilter(filter);

      if (!categoryDetail) {
        throw {
          code: 422,
          message: "Category does not exists",
          status: "CATEGORY_NOT_FOUND",
        };
      }

      const payload = await categorySvc.transfromToCategoryDataForUpdate(
        req,
        categoryDetail,
      );
      const updatedData = await categorySvc.updateCategoryDetailByFilter(
        { _id: categoryDetail._id },
        payload,
      );

      res.json({
        data: updatedData,
        message: "Category Upadted Successfully",
        status: "CATEGORY_UPDATED",
        options: null,
      });
    } catch (exception) {
      throw exception;
    }
  }

  async deleteCategoryById(req, res, next) {
    try {
      let filter = {
        _id: req.params.categoryId,
      };

      //User Role
      if (req.loginUser.role !== UserRole.ADMIN) {
        filter = {
          ...filter,
          createdBy: req.loginUser._id,
        };
      }

      const categoryDetail = await categorySvc.getSingleRowByFilter(filter);

      if (!categoryDetail) {
        throw {
          code: 422,
          message: "Category does not exists",
          status: "CATEGORY_NOT_FOUND",
        };
      }

      const del = await categorySvc.deleteSungleRowByFilter({
        _id: categoryDetail._id,
      });

      res.json({
        data: del,
        message: "Category Deleted Successfully",
        status: "CATEGORY_DELETED",
        options: null,
      });
    } catch (exception) {
      throw exception;
    }
  }
}

const categoryCtrl = new CategoryContoller();
export default categoryCtrl;
