import mongoose from "mongoose";
import { Status } from "../../config/constant.js";

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 100,
      unique: true,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      require: true,
    },
    logo: {
      publicid: String,
      url: String,
      thumbUrl: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
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

const BrandModel = mongoose.model("Brand", BrandSchema);
export default BrandModel;
