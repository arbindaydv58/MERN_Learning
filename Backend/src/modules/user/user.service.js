import fileUploadSvc from "../../service/fileupload.service.js";
import bcrypt from "bcryptjs";
import { randomStringGenerate } from "../../utilities/helpers.js";
import { Status } from "../../config/constant.js";
import UserModel from "./user.model.js";

class UserService {
  async transformUserRegister(req) {
    try {
      const data = req.body;

      if (req.file) {
        data.image = await fileUploadSvc.uploadFile(req.file.path, "/users");
      }

      data.password = bcrypt.hashSync(data.password, 12);
      data.activationToken = randomStringGenerate(150);
      data.expiryTime = new Date(Date.now() + 360000);
      data.status = Status.ACTIVE;

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async transformUserUpdate(req, user) {
    try {
      const data = req.body;

      if (req.file) {
        data.image = await fileUploadSVC.uploadFile(req.file.path, "/users");
      } else {
        data.image = user.image;
      }

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async userRegister(data) {
    try {
      const user = new UserModel(data);
      return await user.save();
    } catch (exception) {
      throw exception;
    }
  }

  async updateUserById(filter, data) {
    try {
      const update = await UserModel.findOneAndUpdate(
        filter,
        { $set: data },
        { new: true },
      );
      return update;
    } catch (exception) {
      throw exception;
    }
  }

  async deleteSingleRowById(filter) {
    try {
      const userDetails = await UserModel.findOneAndDelete(filter);
      return userDetails;
    } catch (exception) {
      throw exception;
    }
  }

  async getSingleRowByFilter(filter) {
    try {
      const userDetails = await UserModel.findOne(filter);
      return userDetails;
    } catch (exception) {
      throw exception;
    }
  }

  async getAllUsersByFilter(filter, { page = 1, limit = 15 }) {
    try {
      let skip = (page - 1) * limit;
      const data = await UserModel.find(filter)
        .sort({ name: "asc" })
        .skip(skip)
        .limit(limit);

      const count = await UserModel.countDocuments(filter);

      return {
        row: data.map(this.getUserPublicProfile),
        pagination: {
          page: page,
          limit: limit,
          total: count,
        },
      };
    } catch (exception) {
      throw exception;
    }
  }

  getUserPublicProfile(user) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      gender: user.gender,
      address: user.address,
      dob: user.dob,
      phone: user.phone,
      status: user.status,
      image: user?.image?.thumbUrl,
    };
  }
}

const userSvc = new UserService();
export default userSvc;
