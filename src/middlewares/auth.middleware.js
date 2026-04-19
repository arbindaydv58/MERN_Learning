import { AppConfig } from "../config/config.js";
import authSvc from "../modules/auth/auth.service.js";
import jwt from "jsonwebtoken";

const checkLogin = () => {
  return async (res, req, next) => {
    try {
      let token = req.headers["authorization"];
      if (!token) {
        throw {
          code: 401,
          message: "Unauthorized access, token is missing",
          status: "UNAUTHORIZED_ERROR",
        };
      }

      token = token.replace("Bearer ", "");
      const sessionData = await authSvc.getSingleRowByFilter({
        "token.access": token,
      });
      if (!sessionData) {
        throw {
          code: 401,
          message: "Unauthorized access, invalid token",
          status: "SESSION_NOT_FOUND_ERROR",
        };
      }

      //token
      const payload = jwt.verify(token, AppConfig.jwtSecret);
    } catch (exception) {
      let error = exception;

      if (exception instanceof jwt.TokenExpiredError) {
        error["code"] = 401;
        error["status"] = "TOKEN_EXPIRED";
      } else if (exception instanceof jwt.JsonWebTokenError) {
        error["code"] = 401;
        error["status"] = "JWT_TOKEN_EXPIRED";
      }
      next(error);
    }
  };
};

export default checkLogin;
