import express from "express";
import { Status, UserRole } from "../../config/constant.js";
import Joi from "joi";
import bodyValidator from "../../middlewares/validator.middleware.js";
import uploader from "../../middlewares/uploder.middleware.js";
import bannerCtrl from "./banner.controller.js";
import checkLogin from "../../middlewares/auth.middleware.js";

const bannerRouter = express.Router();

const BannerDTO = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  url: Joi.string().uri().optional().allow(null, "").default(null),
  status: Joi.string()
    .regex(/^(active|inactive)$/)
    .default(Status.INACTIVE),
  image: Joi.string().allow(null, "").optional().default(null),
});

//public api
bannerRouter.get("/all-list", bannerCtrl.listAllForPublic);

//private api

bannerRouter.post(
  "/",
  checkLogin([UserRole.ADMIN]),
  uploader().single("image"),
  bodyValidator(BannerDTO),
  bannerCtrl.createBanner,
);

bannerRouter.get("/", checkLogin([UserRole.ADMIN]), bannerCtrl.ListAllBanners);

bannerRouter.get(
  "/:bannerId",
  checkLogin([UserRole.ADMIN]),
  bannerCtrl.getBannerDetailById,
);

bannerRouter.put(
  "/:bannerId",
  checkLogin([UserRole.ADMIN]),
  uploader().single("image"),
  bodyValidator(BannerDTO),
  bannerCtrl.updateBannerById,
);

bannerRouter.delete(
  "/:bannerId",
  checkLogin([UserRole.ADMIN]),
  bannerCtrl.deleteBannerById,
);

export default bannerRouter;
