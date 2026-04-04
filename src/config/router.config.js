import express from "express";
import authRouter from "../modules/auth/auth.router.js";

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

export default router;