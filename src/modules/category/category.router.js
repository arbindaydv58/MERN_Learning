import Joi from "joi";
import express from "express"
import { Status, UserRole } from "../../config/constant.js";
import checkLogin from "../../middlewares/auth.middleware.js";
import uploader from "../../middlewares/uploder.middleware.js";
import bodyValidator from "../../middlewares/validator.middleware.js";
import categoryCtrl from "./category.controller.js";

const categoryRouter = express.Router();

const CategoryDTO = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  status: Joi.string()
    .regex(/^(active|inactive)$/)
    .default(Status.INACTIVE),
  isFeatured: Joi.boolean().default(false),
  inMenu: Joi.boolean().default(false),
  parentId:Joi.string().allow(null,"").optional().default(null),
  brand: Joi.array().items(Joi.string()).required(),
  icon: Joi.string().allow(null, "").optional().default(null),
});

//public api
categoryRouter.get("/all-list", categoryCtrl.listAllForPublic);

//private api
categoryRouter.post(
  "/",
  checkLogin([UserRole.ADMIN, UserRole.SELLER]),
  uploader().single("icon"),
  bodyValidator(CategoryDTO),
  categoryCtrl.createCategory,
);

categoryRouter.get(
  "/",
  checkLogin([UserRole.ADMIN, UserRole.SELLER]),
  categoryCtrl.listAllCategories,
);

categoryRouter.get(
  "/:categoryId",
  checkLogin([UserRole.ADMIN, UserRole.SELLER]),
  categoryCtrl.getCategoryDetailById,
);

categoryRouter.put(
  "/:categoryId",
  checkLogin([UserRole.ADMIN, UserRole.SELLER]),
  uploader().single("logo"),
  bodyValidator(CategoryDTO),
  categoryCtrl.updateCategoryById,
);

categoryRouter.delete(
  "/:categoryId",
  checkLogin([UserRole.ADMIN, UserRole.SELLER]),
  categoryCtrl.deleteCategoryById,
);

export default categoryRouter;
