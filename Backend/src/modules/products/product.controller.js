import { UserRole, Status } from "../../config/constant.js";
import productSvc from "./product.service.js";

class ProductContoller {
  async createProduct(req, res, next) {
    try {
      const payload = await productSvc.transfromToProductData(req);
      const product = await productSvc.createData(payload);
      res.json({
        data: product,
        message: "Product created",
        status: "PRODUCT_CREATED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  }

  async listAllProduct(req, res, next) {
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

      const { data, pagination } = await productSvc.getAllRowsByFilter(
        filter,
        paginationFilter,
      );

      res.json({
        data: data,
        message: "Product list fetched",
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

      const { data, pagination } = await productSvc.getAllRowsByFilter(
        filter,
        paginationFilter,
      );

      res.json({
        data: data,
        message: "Product list fetched",
        status: "SUCCESS",
        options: {
          pagination: pagination,
        },
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getProductDetailById(req, res, next) {
    try {
      let filter = {
        _id: req.params.productId,
      };

      //User Role
      if (req.loginUser.role !== UserRole.ADMIN) {
        filter = {
          ...filter,
          createdBy: req.loginUser._id,
        };
      }

      const productDetail = await productSvc.getSingleRowByFilter(filter);

      res.json({
        data: productDetail,
        message: "Product Detail",
        status: "Product_Detail",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  }

  async updateProductById(req, res, next) {
    try {
      let filter = {
        _id: req.params.productId,
      };

      //User Role
      if (req.loginUser.role !== UserRole.ADMIN) {
        filter = {
          ...filter,
          createdBy: req.loginUser._id,
        };
      }

      const productDetail = await productSvc.getSingleRowByFilter(filter);

      if (!productDetail) {
        throw {
          code: 422,
          message: "Product does not exists",
          status: "CATEGORY_NOT_FOUND",
        };
      }

      const payload = await productSvc.transfromToProductDataForUpdate(
        req,
        productDetail,
      );
      const updatedData = await productSvc.updateProductDetailByFilter(
        { _id: productDetail._id },
        payload,
      );

      res.json({
        data: updatedData,
        message: "Product Upadted Successfully",
        status: "CATEGORY_UPDATED",
        options: null,
      });
    } catch (exception) {
      throw exception;
    }
  }

  async deleteProductById(req, res, next) {
    try {
      let filter = {
        _id: req.params.productId,
      };

      //User Role
      if (req.loginUser.role !== UserRole.ADMIN) {
        filter = {
          ...filter,
          createdBy: req.loginUser._id,
        };
      }

      const productDetail = await productSvc.getSingleRowByFilter(filter);

      if (!productDetail) {
        throw {
          code: 422,
          message: "Product does not exists",
          status: "CATEGORY_NOT_FOUND",
        };
      }

      const del = await productSvc.deleteSungleRowByFilter({
        _id: productDetail._id,
      });

      res.json({
        data: del,
        message: "Product Deleted Successfully",
        status: "PRODUCT_DELETED",
        options: null,
      });
    } catch (exception) {
      throw exception;
    }
  }
}

const productCtrl = new ProductContoller();
export default productCtrl;
