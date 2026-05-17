import mongoose from "mongoose";
import { paymentModes, PaymentStatus } from "../../config/config.js";

const TransactionSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    paymentModes: {
      type: String,
      enum: Object.values(paymentModes),
      default: paymentModes.CASH,
    },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.UNPAID,
    },
    amount: {
      type: Number,
      required: true,
    },
    transId: {
      type: String,
      required: true,
      unique: true,
    },
    data: {
      type: String,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  },
);

const TransactionModel = mongoose.model("Transaction", TransactionSchema);
export default TransactionModel