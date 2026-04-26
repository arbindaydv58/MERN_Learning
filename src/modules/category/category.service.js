import slugify from "slugify";
import fileUploadSvc from "../../service/fileupload.service.js";
import CategoryModel from "./category.model.js";

class CategoryService {
  async transfromToCategoryData(req) {
    try {
      const payload = req.body;
      if (req.file) {
        payload.icon = await fileUploadSvc.uploadFile(
          req.file.path,
          "/category/",
        );
      }
      payload.createdBy = req.loginUser._id;
      //slug
      payload.slug = slugify(payload.name, {
        remove: /[*+~.()'"!:@]/g,
        lower: true,
      });

      //foregin key
      if (!payload.parentId || payload.parentOd === "null") {
        payload.parentId = null;
      }

      if (!payload.brands || payload.brands === "null") {
        payload.brands = null;
      }

      return payload;
    } catch (exception) {
      throw exception;
    }
  }

  async transfromToCategoryDataForUpdate(req, oldCategory) {
    try {
      const payload = req.body;
      if (req.file) {
        payload.logo = await fileUploadSvc.uploadFile(
          req.file.path,
          "/category/",
        );
      } else {
        payload.logo = oldCategory.logo;
      }

      //foregin key
      if (!payload.parentId || payload.parentOd === "null") {
        payload.parentId = null;
      }

      if (!payload.brands || payload.brands === "null") {
        payload.brands = null;
      }

      payload.updatedBy = req.loginUser._id;

      return payload;
    } catch (exception) {
      throw exception;
    }
  }

  async createData(payload) {
    try {
      const category = new CategoryModel(payload);
      return await category.save();
    } catch (exception) {
      throw exception;
    }
  }

  async updateCategoryDetailByFilter(filter, payload) {
    try {
      const updated = await CategoryModel.findOneAndUpdate(
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
      const del = await CategoryModel.findOneAndDelete(filter);
      return del;
    } catch (exception) {
      throw exception;
    }
  }

  async getAllRowsByFilter(filter, { page = 1, limit = 15 }) {
    try {
      const skip = (page - 1) * limit;
      const data = await CategoryModel.find(filter)
        .populate("parentId", [
          "_id",
          "name",
          "slug",
          "status",
          "icon",
          "parentId",
          "isFeatured",
          "inMenu",
        ])
        .populate("brand", [
          "_id",
          "name",
          "slug",
          "status",
          "logo",
          "isFeatured",
        ])
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
        .sort({ createAt: "desc" })
        .skip(skip)
        .limit(limit);

      const count = await CategoryModel.countDocuments(filter);

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
      const data = await CategoryModel.findOne(filter)
        .populate("parentId", [
          "_id",
          "name",
          "slug",
          "status",
          "icon",
          "parentId",
          "isFeatured",
          "inMenu",
        ])
        .populate("brand", [
          "_id",
          "name",
          "slug",
          "status",
          "logo",
          "isFeatured",
        ])
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
    } catch (excepation) {
      throw excepation;
    }
  }
}

const categorySvc = new CategoryService();
export default categorySvc;
