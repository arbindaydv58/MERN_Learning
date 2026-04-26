import mongoose from "mongoose";
import { Status } from "../../config/constant.js";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 100,
      unique: true,
      requird: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    parentId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      defult: null,
    },
    icon: {
      publicid: String,
      url: String,
      thumbUrl: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    inMenu: {
      type: Boolean,
      default: false,
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.INACTIVE,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
  },
);

const CategoryModel = mongoose.model("Category", CategorySchema);
export default CategoryModel;
