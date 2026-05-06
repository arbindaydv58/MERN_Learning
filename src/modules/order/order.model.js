import mongoose from   "mongoose";
import { OrderStatus } from "../../config/constant.js";

const OrderSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderCode: {
      type: String,
      unique: true,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    vat: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.keys(OrderStatus),
      default: OrderStatus.PENDING,
    },
    isPaid: {
      type: Boolean,
      default: false,
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

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;
