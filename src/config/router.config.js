import express from "express";
import authRouter from "../modules/auth/auth.router.js";
import brandRouter from "../modules/brand/brand.router.js";
import categoryRouter from "../modules/category/category.router.js";

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

export default router;
