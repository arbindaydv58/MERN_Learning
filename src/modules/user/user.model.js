import mongoose from "mongoose";
import { Gender, Status, UserRole } from "../../config/constant.js";

const UserSchema = new mongoose.Schema(
  {
    //property definition
    name: {
      type: String,
      min: 5,
      max: 10,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.CUSTOMER,
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
    },
    address: String,
    phone: String,
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.INACTIVE,
    },
    activationToken: String,
    expiryTime: Date,
    image: {
      publicid: String,
      url: String,
      thumbUrl: String,
    },
  },
  { timestamps: true, autoCreate: true, autoIndex: true },
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
