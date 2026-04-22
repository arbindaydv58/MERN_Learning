import express from "express";
import { Status, UserRole } from "../../config/constant.js";
import Joi from "joi";
import bodyValidator from "../../middlewares/validator.middleware.js";
import uploader from "../../middlewares/uploder.middleware.js";
import brandCtrl from "./brand.controller.js";
import checkLogin from "../../middlewares/auth.middleware.js";

const brandRouter = express.Router();

const BrandDTO = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  status: Joi.string()
    .regex(/^(active|inactive)$/)
    .default(Status.INACTIVE),
  isFeatured: Joi.boolean().default(false),
  logo: Joi.string().allow(null, "").optional().default(null),
});

brandRouter.post(
  "/",
  checkLogin([UserRole.ADMIN, UserRole.SELLER]),
  uploader().single("logo"),
  bodyValidator(BrandDTO),
  brandCtrl.createBrand,
);

brandRouter.get(
  "/",
  checkLogin([UserRole.ADMIN, UserRole.SELLER]),
  brandCtrl.ListAllBrands,
);

brandRouter.get(
  "/:brandId",
  checkLogin([UserRole.ADMIN, UserRole.SELLER]),
  brandCtrl.getBrandDetailById,
);

export default brandRouter;
