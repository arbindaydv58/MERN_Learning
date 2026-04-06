import userSvc from "../user/user.service.js";
import authMailSvc from "./auth.mail.js";

class AuthController {
  registerUser = async (req, res, next) => {
    try {
      const data = await userSvc.transformUserRegister(req);

      //*SMTP Server
      await authMailSvc.notifyUserRegistration(data);

      res.json({
        data: { data },
        message: "register sucess",
        status: "Ok",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  getLoggedInUserProfile = (req, res, next) => {
    res.json({
      data: {},
      message: "your profile",
      status: "Ok",
      options: null,
    });
  };

  updateUserById = (req, res, next) => {};
}

const authCtrl = new AuthController();

export default authCtrl;
