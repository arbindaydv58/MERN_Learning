import express from "express";
import authRouter from "../modules/auth/auth.router.js";
import brandRouter from "../modules/brand/brand.router.js";
import categoryRouter from "../modules/category/category.router.js";
import userRouter from "../modules/user/user.router.js";
import productRouter from "../modules/products/product.router.js";
import orderDetailRouter from "../modules/order-details/oreder-detail.router.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    data: "any data",
    message: "Success",
    status: "ok",
    options: null,
  });
});

router.use("/auth", authRouter);
router.use("/brand", brandRouter);
router.use("/category",categoryRouter)
router.use("/user",userRouter)
router.use("/product",productRouter)
router.use("/cart",orderDetailRouter)

export default router;
