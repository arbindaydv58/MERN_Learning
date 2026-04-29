import express from "express";
import Joi from "joi";
import checkLogin from "../../middlewares/auth.middleware.js";
import { UserRole } from "../../config/constant.js";
import authCtrl from "../auth/auth.controller.js";
import { RegisterUserDTO } from "../auth/auth.validator.js";
import bodyValidator from "../../middlewares/validator.middleware.js";
import uploader from "../../middlewares/uploder.middleware.js";
import userCtrl from "./user.controller.js";

const userRouter = express.Router();

//user router
const UserUpdateDTO = Joi.object({
  name: Joi.string().min(5).max(50).required(),
  role: Joi.string()
    .regex(/^(customer|seller)$/)
    .optional()
    .default("customer"),
  address: Joi.string().allow(null, "").optional().default(null),
  phone: Joi.string().allow(null, "").optional().default(null),
  gender: Joi.string()
    .regex(/^(male|female|other)$/)
    .required(),
  dob: Joi.date().greater("now"),
  status: Joi.string()
    .regex(/^(active|inactive)$/)
    .optional()
    .default("inactive"),

  image: Joi.string().allow(null, "").optional().default(null),
});

userRouter.post(
  "/",
  checkLogin([UserRole.ADMIN]),
  uploader().single("image"),
  bodyValidator(RegisterUserDTO),
  authCtrl.registerUser,
);

userRouter.get("/", checkLogin(), userCtrl.listAllUser);
userRouter.get("/:userId", checkLogin(), userCtrl.getDetailById);

userRouter.put(
  "/:userId",
  checkLogin([UserRole.ADMIN]),
  uploader().single("image"),
  bodyValidator(UserUpdateDTO),
  userCtrl.updateUserById,
);

userRouter.delete(
  "/:userId",
  checkLogin(UserRole.ADMIN),
  userCtrl.deleteUserById,
);

export default userRouter;
