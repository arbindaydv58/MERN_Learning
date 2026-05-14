import Joi from "joi";
import express from "express";
import checkLogin from "../../middlewares/auth.middleware.js";
import { UserRole } from "../../config/constant.js";
import bodyValidator from "../../middlewares/validator.middleware.js";
import orderCtrl from "./order.controller.js";

const orderRouter = express.Router();

const checkoutDTO = Joi.object({
  cartIds: Joi.array().items(Joi.string()).required(),
  //voucherId:Joi.string().allow(null,'').option().default(null)
});

orderRouter.post(
  "/",
  checkLogin([UserRole.ADMIN, UserRole.CUSTOMER]),
  bodyValidator(checkoutDTO),
  orderCtrl.checkout,
);

orderRouter.get("/", checkLogin(), orderCtrl.ListAllOrders);

orderRouter.get(
  "/:orderId",
  checkLogin([UserRole.ADMIN, UserRole.CUSTOMER]),
  orderCtrl.getOrderDetail,
);

export default orderRouter;
