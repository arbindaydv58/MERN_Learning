import ChatModel from "./chat.model.js";

class ChatController {
  async storeChat(req, res, next) {
    try {
      const loggedInUser = req.loggedInUser;
      const data = req.body;
      data.sender = loggedInUser._id;

      const chat = new ChatModel(data);
      await chat.save();

      res.json({
        data: chat,
        message: "Your message has been sent",
        status: "CHAT_MESSAGE_SENT",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  }

  async listAllChatWithUser(req, res, next) {
    try {
      const loggedInUser = req.loggedInUser;
      const userId = req.params.userId;

      let chatFilter = {
        $or: [
          { sender: loggedInUser._id, receiver: userId },
          { sender: userId, receiver: loggedInUser._id },
        ],
      };

      if (req.query.search) {
        chatFilter = {
          ...chatFilter,
          message: new RegExp(req.query.search, "i"),
        };
      }

      const page = +req.query.page || 1;
      const limit = +req.query.limit || 25;

      let skip = (page - 1) * limit;

      const chatMessage = await ChatModel.find(chatFilter)
        .populate("sender", ["_id", "name", "email", "role", "image"])
        .populate("receiver", ["_id", "name", "email", "role", "image"]);

      const count = await ChatModel.countDocuments(chatFilter);
      res.json({
        data: chatMessage,
        message: "Your chat list",
        status: "CHAT_DATA",
        optional: {
          page: page,
          limi: limit,
          total: count,
        },
      });
    } catch (exception) {
      next(exception);
    }
  }
}

const chatCtrl = new ChatController();
export default chatCtrl;
