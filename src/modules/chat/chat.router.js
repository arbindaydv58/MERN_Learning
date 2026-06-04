import express from "express";
import checkLogin from "../../middlewares/auth.middleware.js";
import bodyValidator from "../../middlewares/validator.middleware.js";
import Joi from "joi";
import chatCtrl from "./chat.controller.js";

const chatRouter = express.Router();

const ChatMessageDTO = Joi.object({
  receiver: Joi.string().required(),
  message: Joi.min(1).required(),
});

chatRouter.post(
  "/",
  checkLogin(),
  bodyValidator(ChatMessageDTO),
  chatCtrl.storeChat,
);
chatRouter.get("/:userId", checkLogin(), chatCtrl.listAllChatWithUser);

export default chatRouter;
