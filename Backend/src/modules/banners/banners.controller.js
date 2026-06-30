import { Status, UserRole } from "../../config/constant.js";
import bannerSvc from "./banners.service.js";

class BannerController {
  async createBanner(req, res, next) {
    try {
      const payload = await bannerSvc.transfromToBanner(req);
      const banner = await bannerSvc.createData(payload);

      res.json({
        data: banner,
        message: "Banner Created",
        status: "BANNER_CREATED",
        options: null,
      });
    } catch (exception) {
      throw exception;
    }
  }

  async ListAllBanners(req, res, next) {
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
          [Op.or]:[
            {title:{[Op.iLike]:`%${rq.query.search}%`}},
            {url:{[Op.iLike]:`%${rq.query.search}%`}}
          ]
        };
      }

     

      const paginationFilter = {
        page: +req.query.page || 1,
        limit: +req.query.limit || 15,
      };

      const { data, pagination } = await bannerSvc.getAllRowsByFilter(
        filter,
        paginationFilter,
      );

      res.json({
        data: data,
        message: "Banner List Fetched",
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
      };

    

      const paginationFilter = {
        page: +req.query.page || 1,
        limit: +req.query.limit || 15,
      };

      const { data, pagination } = await bannerSvc.getAllRowsByFilter(
        filter,
        paginationFilter,
      );

      res.json({
        data: data,
        message: "Banner list fetched",
        status: "SUCCESS",
        options: {
          pagination: pagination,
        },
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getBannerDetailById(req, res, next) {
    try {
      let filter = {
        _id: req.params.bannerId,
      };

      

      const bannerDetail = await bannerSvc.getSingleRowByFilter(filter);

      res.json({
        data: bannerDetail,
        message: "Banner Detail",
        status: "BANNER_DETAIL",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  }

  async updateBannerById(req, res, next) {
    try {
      let filter = {
        _id: req.params.bannerId,
      };

    

      const bannerDetail = await bannerSvc.getSingleRowByFilter(filter);

      if (!bannerDetail) {
        throw {
          code: 422,
          message: "Banner does not exists",
          status: "BANNER_NOT_FOUND",
        };
      }

      const payload = await bannerSvc.transfromToBannerDataForUpdate(
        req,
        bannerDetail,
      );
      const updatedData = await bannerSvc.updateBannerDetailByFilter(
        { _id: bannerDetail._id },
        payload,
      );

      res.json({
        data: updatedData,
        message: "Banner Upadted Successfully",
        status: "BANNER_UPDATED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  }

  async deleteBannerById(req, res, next) {
    try {
      let filter = {
        _id: req.params.bannerId,
      };

     
      const bannerDetail = await bannerSvc.getSingleRowByFilter(filter);

      if (!bannerDetail) {
        throw {
          code: 422,
          message: "Banner does not exists",
          status: "BANNER_NOT_FOUND",
        };
      }

      const del = await bannerSvc.deleteSungleRowByFilter({
        _id: bannerDetail._id,
      });

      res.json({
        data: del,
        message: "Banner Deleted Successfully",
        status: "BANNER_DELETED",
        options: null,
      });
    } catch (exception) {
      throw exception;
    }
  }
}

const bannerCtrl = new BannerController();
export default bannerCtrl;
