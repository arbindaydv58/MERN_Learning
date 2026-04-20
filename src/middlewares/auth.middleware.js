import { AppConfig } from "../config/config.js";
import authSvc from "../modules/auth/auth.service.js";
import jwt from "jsonwebtoken";
import userSvc from "../modules/user/user.service.js";
import { UserRole } from "../config/constant.js";

const checkLogin = (allowedRole = null) => {
  return async (req, res, next) => {
    try {
      let token = req.headers["authorization"] || null;
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

      //RBAC
      if (payload.typ !== "Bearer") {
        throw {
          code: 401,
          message: "Invalid token type",
          status: "INVALID_TOKEN_TYPE",
        };
      }

      const userDetails = await userSvc.getSingleRowByFilter({
        _id: payload.sub,
      });

      if (!userDetails) {
        throw {
          code: 402,
          message: "User was already deleted or does not exits anymore",
          status: "USER_NOT_FOUND",
        };
      }

      req.loginUser = userSvc.getUserPublicProfile(userDetails);

      if (
        userDetails.role === UserRole.ADMIN ||
        !allowedRole ||
        allowedRole.includes(userDetails.role)
      ) {
        next();
      } else {
        throw {
          code: 403,
          message: "You are not authorized to access this resource",
          status: "PERMISSION_DENID",
        };
      }
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
