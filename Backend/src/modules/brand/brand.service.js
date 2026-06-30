import fileUploadSvc from "../../service/fileupload.service.js";
import { default as slugify } from "slugify";
import BrandModel from "./brand.model.js";

class BrandService {
  async transfromToBrand(req) {
    try {
      const payload = req.body;
      if (req.file) {
        payload.logo = await fileUploadSvc.uploadFile(req.file.path, "/brand");
      }

      payload.createdBy = req.loginUser._id;

      //slug
      payload.slug = slugify(payload.name, {
        remove: /[*+~.()'"!:@]/g,
        lower: true,
      });

      return payload;
    } catch (exception) {
      throw exception;
    }
  }

  async createData(payload) {
    try {
      const brand = new BrandModel(payload);
      return await brand.save();
    } catch (exception) {
      throw exception;
    }
  }

  async updateBrandDetailByFilter(filter, payload) {
    try {
      const updated = await BrandModel.findOneAndUpdate(
        filter,
        {
          $set: payload,
        },
        { new: true },
      );
      return updated;
    } catch (exception) {
      throw exception;
    }
  }

  async deleteSungleRowByFilter(filter) {
    try {
      const del = await BrandModel.findOneAndDelete(filter);
      return del;
    } catch (exception) {
      throw exception;
    }
  }

  async getAllRowsByFilter(filter, { page = 1, limit = 15 }) {
    try {
      const skip = (page - 1) * limit;
      const data = await BrandModel.find(filter)
        .populate("createdBy", [
          "_id",
          "name",
          "email",
          "role",
          "phone",
          "image",
        ])
        .populate("updatedBy", [
          "_id",
          "name",
          "email",
          "role",
          "phone",
          "image",
        ])
        .sort({ createdAt: "desc" })
        .skip(skip)
        .limit(limit);

      const count = await BrandModel.countDocuments(filter);

      return {
        data,
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
      const data = await BrandModel.findOne(filter)
        .populate("createdBy", [
          "_id",
          "name",
          "email",
          "role",
          "phone",
          "image",
        ])
        .populate("updatedBy", [
          "_id",
          "name",
          "email",
          "role",
          "phone",
          "image",
        ]);

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async transfromToBrandDataForUpdate(req, oldBrand) {
    try {
      const payload = req.body;
      if (req.file) {
        payload.logo = await fileUploadSvc.uploadFile(req.file.path, "/brand/");
      } else {
        payload.logo = oldBrand.logo;
      }

      payload.updateBy = req.loginUser._id;

      return payload;
    } catch (exception) {
      throw exception;
    }
  }
}

const brandSvc = new BrandService();
export default brandSvc;
