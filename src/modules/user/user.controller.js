import userSvc from "./user.service.js";

class UserController {
  async listAllUser(req, res, next) {
    try {
      let filter = {
        _id: { $ne: req.loginUser._id },
      };

      if (req.query.search) {
        filter = {
          ...filter,
          $or: [
            { name: new RegExp(req.query.search, "i") },
            { email: new RegExp(req.query.search, "i") },
            { adress: new RegExp(req.query.search, "i") },
            { phone: new RegExp(req.query.search, "i") },
            { dod: new RegExp(req.query.search, "i") },
          ],
        };
      }

      if (req.query.role) {
        filter = {
          ...filter,
          role: req.query.role,
        };
      }

      if (req.query.status) {
        filter = {
          ...filter,
          status: req.query.status,
        };
      }

      const { row, pagination } = await userSvc.getAllUsersByFilter(
        filter,
        req.query,
      );

      res.json({
        data: row,
        message: "Your user Lists",
        status: "USER_LISTS",
        optiosn: {
          pagination,
        },
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getDetailById(req, res, next) {
    try {
      const userDetail = await userSvc.getSingleRowByFilter({
        _id: req.params.userId,
      });
      if (!userDetail) {
        throw {
          code: 422,
          message: "User not Found",
          status: "USER_NOT_FOUND",
        };
      }
      res.json({
        data: userSvc.getUserPublicProfile(userDetail),
        message: "User Details",
        status: "USER_DETAILS_FEATURED",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async updateUserById(req, res, next) {
    try {
      const userDetail = await userSvc.getSingleRowByFilter({
        _id: req.params.userId,
      });
      if (!userDetail) {
        throw {
          code: 422,
          message: "User not Found",
          status: "USER_NOT_FOUND",
        };
      }

      const payload = await userSvc.transformUserUpdate(req, userDetail);
      const update = await userSvc.updateUserById(
        { _id: userDetail._id },
        payload,
      );

      res.json({
        data: userSvc.getUserPublicProfile(update),
        message: "User Details",
        status: "USER_DETAILS_FEATURED",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async deleteUserById(req, res, next) {
    try {
      const userDetail = await userSvc.getSingleRowByFilter({
        _id: req.params.userId,
      });
      if (!userDetail) {
        throw {
          code: 422,
          message: "User not Found",
          status: "USER_NOT_FOUND",
        };
      }

      const del = await userSvc.deleteSingleRowById({ _id: userDetail._id });

      res.json({
        data: userSvc.getUserPublicProfile(del),
        message: "User Details",
        status: "USER_DETAILS_FEATURED",
      });
    } catch (exception) {
      next(exception);
    }
  }
}

const userCtrl = new UserController();
export default userCtrl;
