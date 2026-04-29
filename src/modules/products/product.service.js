import slugify from "slugify";
import fileUploadSvc from "../../service/fileupload.service.js";
import ProductModel from "./product.model.js";
import { UserRole } from "../../config/constant.js";

class ProductService {
  async transfromToProductData(req) {
    try {
      const payload = req.body;

      //product image
      payload.image = [];

      if (req.files) {
        let uploadFile = req.files.map((image) =>
          fileUploadSvc.uploadFile(image.path, "/products"),
        );

        const response = await Promise.allSettled(uploadFile);

        response.map((image) => {
          if (image.status === "fulfilled") {
            payload.image.push(image.value);
          }
        });
      }

      payload.price = payload.price * 100;
      payload.afterDiscount =
        payload.price - (payload.price * payload.discount) / 100;

      payload.createdBy = req.loginUser._id;
      //slug
      payload.slug = slugify(payload.name, {
        remove: /[*+~.()'"!:@]/g,
        lower: true,
      });

      //foregin key
      if (!payload.category || payload.category === "null") {
        payload.category = null;
      }

      if (!payload.brand || payload.brand === "null") {
        payload.brand = null;
      }

      if (req.loginUser.role === UserRole.SELLER) {
        payload.seller = req.loginUser._id;
      }

      return payload;
    } catch (exception) {
      throw exception;
    }
  }

  async transfromToProductDataForUpdate(req, oldProduct) {
    try {
      const payload = req.body;

      //product image
      payload.image = [...oldProduct.image];

      if (req.files) {
        let uploadFile = req.files.map((image) =>
          fileUploadSVC.uploadFile(image.path, "/products"),
        );

        const response = await Promise.allSettled(uploadFile);

        response.map((image) => {
          if (image.status === "fulfilled") {
            payload.image.push(image.value);
          }
        });
      }

      payload.price = payload.price * 100;
      payload.afterDiscount =
        payload.price - (payload.price * payload.discount) / 100;

      payload.updatedBy = req.loginUser._id;

      //foregin key
      if (!payload.category || payload.category === "null") {
        payload.category = null;
      }

      if (!payload.brand || payload.brand === "null") {
        payload.brand = null;
      }

      return payload;
    } catch (exception) {
      throw exception;
    }
  }

  async createData(payload) {
    try {
      const product = new ProductModel(payload);
      return await product.save();
    } catch (exception) {
      throw exception;
    }
  }

  async updateProductDetailByFilter(filter, payload) {
    try {
      const updated = await ProductModel.findOneAndUpdate(
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
      const del = await ProductModel.findOneAndDelete(filter);
      return del;
    } catch (exception) {
      throw exception;
    }
  }

  async getAllRowsByFilter(filter, { page = 1, limit = 15 }) {
    try {
      const skip = (page - 1) * limit;
      const data = await ProductModel.find(filter)
        .populate("category", [
          "_id",
          "name",
          "slug",
          "status",
          "image",
          "isFeatured",
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

      const count = await ProductModel.countDocuments(filter);

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
      const data = await ProductModel.findOne(filter)
        .populate("category", [
          "_id",
          "name",
          "slug",
          "status",
          "image",
          "isFeatured",
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

const productSvc = new ProductService();
export default productSvc;
