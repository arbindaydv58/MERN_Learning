import mongoose from "mongoose";
import { Status } from "../../config/constant.js";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 3,
      max: 250,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 10000,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 85,
    },
    afterDiscount: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      min: 0,
      default: 0,
    },
    sku: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    seller: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
      defult: null,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.INACTIVE,
    },
    image: [
      {
        publicid: String,
        url: String,
        thumbUrl: String,
      },
    ],
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

const ProductModel = mongoose.model("Product", ProductSchema);

export default ProductModel;
