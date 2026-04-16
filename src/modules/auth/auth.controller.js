import { randomStringGenerate } from "../../utilities/helpers.js";
import userSvc from "../user/user.service.js";
import authMailSvc from "./auth.mail.js";

class AuthController {
  registerUser = async (req, res, next) => {
    try {
      const data = await userSvc.transformUserRegister(req);
      const user = await userSvc.userRegister(data);

      //*SMTP Server
      await authMailSvc.notifyUserRegistration(data);

      res.json({
        data: userSvc.getUserPublicProfile(user),
        message: "register sucess",
        status: "Ok",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  // * Activate User
  activateUserProfile = async (req, res, next) => {
    try {
      let token = req.params.token;
      const userDetails = await userSvc.getSingleRowByFilter({
        activationToken: token,
      });

      if (!userDetails) {
        throw {
          code: 422,
          message: "User not found",
          status: "USER_NOT_FOUND_ERROR",
        };
      }

      // expire time check
      let expiryTime = userDetails.expiryTime.getTime();
      let currentTime = Date.now();

      if (currentTime > expiryTime) {
        userDetails.activationToken = randomStringGenerate(150);
        userDetails.expiryTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await userDetails.save();
        await authMailSvc.notifyUserRegistration(userDetails);
        res.json({
          data: null,
          message:
            "Activation link expired. A new activation email has been sent.",
          status: "RESENT_ACTIVATION_EMAIL",
          optional: null,
        });
      } else {
        userDetails.activationToken = null;
        userDetails.expiryTime = null;
        userDetails.isActive = true;
        await userDetails.save();
        await authMailSvc.notifyUserActivationSuccess(userDetails);
        res.json({
          data: null,
          message:
            "Your account has been activated successfully. Please log in to access your profile.",
          status: "ACCOUNT_ACTIVATED",
          optional: null,
        });
      }
    } catch (exception) {
      next(exception);
    }
  };

  loginUser = async (req, res, next) => {};

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
