import { Status } from "../../config/constant.js";
import { randomStringGenerate } from "../../utilities/helpers.js";
import userSvc from "../user/user.service.js";
import authMailSvc from "./auth.mail.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AppConfig } from "../../config/config.js";
import authSvc from "./auth.service.js";

class AuthController {
  registerUser = async (req, res, next) => {
    try {
      const data = await userSvc.transformUserRegister(req);
      const user = await userSvc.userRegister(data);

      //*SMTP Server
      await authMailSvc.notifyUserRegistration(data);

      res.json({
        data: userSvc.getUserPublicProfile(user),
        message: "register success",
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

  loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userInfo = await userSvc.getSingleRowByFilter({ email: email });

      if (!userInfo) {
        throw {
          code: 422,
          message: "User not registered with this email",
          status: "USER_DOES_NOT_EXISTS",
        };
      }

      if (!bcrypt.compareSync(password, userInfo.password)) {
        throw {
          code: 422,
          message: "Credential mismatch",
          status: "CREDENTIAL_MISMATCH",
        };
      }

      if (
        userInfo.status !== Status.ACTIVE ||
        userInfo.activationToken !== null
      ) {
        throw {
          code: 422,
          message:
            "Your account is not active yet, Please check your email for activation link",
          Status: "ACCOUNT_NOT_ACTIVE",
        };
      }

      //*generate JWT token

      const accessToken = jwt.sign(
        {
          sub: userInfo._id,
          typ: "Bearer",
        },
        AppConfig.jwtSecret,
        { expiresIn: "1hr" },
      );

      const refreshToken = jwt.sign(
        {
          sub: userInfo._id,
          typ: "Refresh",
        },
        AppConfig.jwtSecret,
        { expiresIn: "7d" },
      );

      let sessionData = {
        user: userInfo._id,
        token: {
          access: accessToken,
          refresh: refreshToken,
        },
        accessDevice: req.headers["user-agent"],
        ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
      };

      await authSvc.storeSession(sessionData);

      res.json({
        data: { accessToken: accessToken, refreshToken: refreshToken },
        message: "Login Successful",
        status: "LOGIN_SUCCESS",
        options: null,
      });
    } catch (exception) {
      throw exception;
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
