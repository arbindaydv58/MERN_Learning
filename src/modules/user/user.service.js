import fileUploadSvc from "../../service/fileupload.service.js";
import bcrypt from "bcryptjs";
import { randomStringGenerate } from "../../utilities/helpers.js";
import Status from "../../config/constant.js";

class UserService {
  async transformUserRegister(req) {
    try {
      const data = req.body;

      if (req.file) {
        data.file = await fileUploadSvc.uploadFile(req.file.path, "/users");
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
}

const userSvc = new UserService();
export default userSvc;
