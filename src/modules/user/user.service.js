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

  async userRegister(data) {
    try {
      const user = new UserModel(data);
      return await user.save();
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
