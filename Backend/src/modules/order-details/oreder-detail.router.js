import express from "express"
import Joi from "joi";
import checkLogin from "../../middlewares/auth.middleware.js"
import { UserRole } from "../../config/constant.js";
import bodyValidator from "../../middlewares/validator.middleware.js"
import orderDetailCtrl from "./order-detail.controller.js";

const orderDetailRouter = express.Router();

const AddToCartDTO = Joi.object({
  product: Joi.string().required(),
  quantity: Joi.number().min(1).max(10).required(),
});

const UpdateCartDTO = Joi.object({
  product: Joi.string().required(),
  quantity: Joi.number().min(0).required(),
});

//add to cart
orderDetailRouter.post(
  "/",
  checkLogin([UserRole.ADMIN, UserRole.CUSTOMER]),
  bodyValidator(AddToCartDTO),
  orderDetailCtrl.addToCart,
);

orderDetailRouter.get(
  "/",
  checkLogin([UserRole.ADMIN, UserRole.CUSTOMER]),
  orderDetailCtrl.listMyCartItem,
);

//remove/update cart
orderDetailRouter.post(
  "/remove",
  checkLogin([UserRole.ADMIN, UserRole.CUSTOMER]),
  bodyValidator(UpdateCartDTO),
  orderDetailCtrl.removeFromCart,
);

export default orderDetailRouter;
