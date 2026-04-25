import { Status, UserRole } from "../../config/constant.js";
import brandSvc from "./brand.service.js";

class BrandController {
  async createBrand(req, res, next) {
    try {
      const payload = await brandSvc.transfromToBrand(req);
      const brand = await brandSvc.createData(payload);

      res.json({
        data: brand,
        message: "Brand Created",
        status: "BRAND_CREATED",
        options: null,
      });
    } catch (exception) {
      throw exception;
    }
  }

  async ListAllBrands(req, res, next) {
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

      //user role
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

      const { data, pagination } = await brandSvc.getAllRowsByFilter(
        filter,
        paginationFilter,
      );

      res.json({
        data: data,
        message: "Brand List Fetched",
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

      const { data, pagination } = await brandSvc.getAllRowsByFilter(
        filter,
        paginationFilter,
      );

      res.json({
        data: data,
        message: "Brand list fetched",
        status: "SUCCESS",
        options: {
          pagination: pagination,
        },
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getBrandDetailById(req, res, next) {
    try {
      let filter = {
        _id: req.params.brandId,
      };

      //user role
      if (req.loginUser.role !== UserRole.ADMIN) {
        filter = {
          ...filter,
          createdBy: req.loginUser._id,
        };
      }

      const brandDetail = await brandSvc.getSingleRowByFilter(filter);

      res.json({
        data: brandDetail,
        message: "Brand Detail",
        status: "BRAND_DETAIL",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  }

  async updateBrandById(req, res, next) {
    try {
      let filter = {
        _id: req.params.brandId,
      };

      //User Role
      if (req.loginUser.role !== UserRole.ADMIN) {
        filter = {
          ...filter,
          createdBy: req.loginUser._id,
        };
      }

      const brandDetail = await brandSvc.getSingleRowByFilter(filter);

      if (!brandDetail) {
        throw {
          code: 422,
          message: "Brand does not exists",
          status: "BRAND_NOT_FOUND",
        };
      }

      const payload = await brandSvc.transfromToBrandDataForUpdate(
        req,
        brandDetail,
      );
      const updatedData = await brandSvc.updateBrandDetailByFilter(
        { _id: brandDetail._id },
        payload,
      );

      res.json({
        data: updatedData,
        message: "Brand Upadted Successfully",
        status: "BRAND_UPDATED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  }

  async deleteBrandById(req, res, next) {
    try {
      let filter = {
        _id: req.params.brandId,
      };

      //User Role
      if (req.loginUser.role !== UserRole.ADMIN) {
        filter = {
          ...filter,
          createdBy: req.loginUser._id,
        };
      }

      const brandDetail = await brandSvc.getSingleRowByFilter(filter);

      if (!brandDetail) {
        throw {
          code: 422,
          message: "Brand does not exists",
          status: "BRAND_NOT_FOUND",
        };
      }

      const del = await brandSvc.deleteSungleRowByFilter({
        _id: brandDetail._id,
      });

      res.json({
        data: del,
        message: "Brand Deleted Successfully",
        status: "BRAND_DELETED",
        options: null,
      });
    } catch (exception) {
      throw exception;
    }
  }
}

const brandCtrl = new BrandController();
export default brandCtrl;
