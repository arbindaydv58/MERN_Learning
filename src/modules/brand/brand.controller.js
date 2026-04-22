import { UserRole } from "../../config/constant.js";
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
}

const brandCtrl = new BrandController();
export default brandCtrl;
