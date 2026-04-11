import checkLogin from "../../middlewares/auth.middleware.js";
import authCtrl from "./auth.controller.js";
import uploader from "../../middlewares/uploder.middleware.js";

import express from "express";
import bodyValidator from "../../middlewares/validator.middleware.js";
import { RegisterUserDTO } from "./auth.validator.js";
const authRouter = express.Router();

//*Registeration
//uploader().none(), // if content type is multipart/from-data but not have a file upload
//uploader().single('image'), // if your data has image as a file type, and is able to select only 1 image at a time
//uploader().array('image') // if you data has image as a file type and is able to select any number of images at a time
// uploader.fields([{name:"image", maxCount:1},{name:"gallery", maxCount:10}]) // if you data has multiple file upload

authRouter.post(
  "/register",
  uploader().single("image"), //if your data has image as a file type, and is able to select only 1 image at a time
  bodyValidator(RegisterUserDTO),
  authCtrl.registerUser,
);
authRouter.get("/activate/:token", authCtrl.activateUserProfile);
authRouter.get("/me", checkLogin(), authCtrl.getLoggedInUserProfile);
authRouter.put("/:userId", checkLogin(), authCtrl.updateUserById);

export default authRouter;
