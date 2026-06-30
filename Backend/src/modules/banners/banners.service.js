import fileUploadSvc from "../../service/fileupload.service.js";
import BannerModel from "./banners.model.js";

class BannerService {
  async transfromToBanner(req) {
    try {
      const payload = req.body;
      if (req.file) {
        payload.image = await fileUploadSvc.uploadFile(req.file.path, "/banner");
      }

     

      return payload;
    } catch (exception) {
      throw exception;
    }
  }

  async createData(payload) {
    try {

      const banner = await BannerModel.create(payload)
      return banner
    } catch (exception) {
      throw exception;
    }
  }

  async updateBannerDetailByFilter(filter, payload) {
    try {
      return await BannerModel.update(payload,{
        where:filter
      })
    } catch (exception) {
      throw exception;
    }
  }

  async deleteSungleRowByFilter(filter) {
    try {
    return await BannerModel.destory({
      where:filter
    })
    } catch (exception) {
      throw exception;
    }
  }

  async getAllRowsByFilter(filter, { page = 1, limit = 15 }) {
    try {
      const skip = (page - 1) * limit;
      

      const {rows,count} = await BannerModel.findAndCountAll({
        where:filter,
        order:[["createAt","desc"]],
        offset:skip,
        limit:limit
      });

      return {
        data:rows,
        pagination: {
          page: page,
          limit: limit,
          total: count,
          totalPages: Math.ceil(count / limit),
        },
      };
    } catch (exception) {
      throw exception;
    }
  }

  async getSingleRowByFilter(filter) {
    try {
      const data = await BannerModel.findOne({
        where:filter
      })

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async transfromToBannerDataForUpdate(req, oldBanner) {
    try {
      const payload = req.body;
      if (req.file) {
        payload.image = await fileUploadSvc.uploadFile(req.file.path, "/banner/");
      } else {
        payload.image = oldBanner.image;
      }


      return payload;
    } catch (exception) {
      throw exception;
    }
  }
}

const bannerSvc = new BannerService();
export default bannerSvc;
