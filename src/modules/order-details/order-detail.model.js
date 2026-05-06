import mongoose from "mongoose";
import orderModel from "../order/order.model.js"
import { OrderStatus } from "../../config/constant.js";

const OrderDetailSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Types.ObjectId,
      ref: "Order",
      default: null, // if order is null -----> it's a cart!!
    },
    buyer: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      min: 1,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    deliveryCharge: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    seller: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default:null
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
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

const OrderDetailModel = mongoose.model("OrderDetail", OrderDetailSchema);
export default OrderDetailModel;
