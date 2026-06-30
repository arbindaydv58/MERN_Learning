import Joi from "joi";
import express from "express"
import uploader from "../../middlewares/uploder.middleware.js";
import checkLogin from "../../middlewares/auth.middleware.js";
import { Status, UserRole } from "../../config/constant.js";
import bodyValidator from "../../middlewares/validator.middleware.js";
import productCtrl from "./product.controller.js";

const productRouter = express.Router();

const ProductDTO = Joi.object({
  name: Joi.string().min(3).max(250).required(),
  price: Joi.number().min(100).required(),
  discount: Joi.number().min(0).max(85).allow(null, "").optional().default(0),
  description: Joi.string().required(),
  category: Joi.array().items(Joi.string()).required(),
  brand: Joi.string().allow(null, "").optional().default(null),
  isFeatured: Joi.boolean().default(false),
  seller: Joi.string().allow(null, "").optional().default(null),
  stock: Joi.number().min(1).default(0).allow(null, "").optional().default(0),
  sku: Joi.string().required(),
  status: Joi.string()
    .regex(/^(active|inactive)$/)
    .default(Status.INACTIVE),
  image: Joi.string().allow(null, "").optional().default(null),
});

//public api
productRouter.get("/all-list", productCtrl.listAllForPublic);

//private api
productRouter.post(
  "/",
  checkLogin([UserRole.ADMIN, UserRole.SELLER]),
  uploader().array("image"),
  bodyValidator(ProductDTO),
  productCtrl.createProduct,
);

productRouter.get(
  "/",
  checkLogin([UserRole.ADMIN, UserRole.SELLER]),
  productCtrl.listAllProduct,
);

productRouter.get(
  "/:productId",
  checkLogin([UserRole.ADMIN, UserRole.SELLER]),
  productCtrl.getProductDetailById,
);

productRouter.put(
  "/:productId",
  checkLogin([UserRole.ADMIN, UserRole.SELLER]),
  uploader().array("image"),
  bodyValidator(ProductDTO),
  productCtrl.updateProductById,
);

productRouter.delete(
  "/:productId",
  checkLogin([UserRole.ADMIN, UserRole.SELLER]),
  productCtrl.deleteProductById,
);

export default  productRouter;
