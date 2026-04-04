import fileUploadSvc from "../../service/fileupload.service.js";

class AuthController {
  registerUser = async (req, res, next) => {
    try {
      const data = req.body;
      const file = await fileUploadSvc.uploadFile(req.file.path,"/users");

      res.json({
        data: { data, file },
        message: "register sucess",
        status: "Ok",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  getLoggedInUserProfile  = (req, res, next) => {
    res.json({
      data: {},
      message: "your profile",
      status: "Ok",
      options: null,
    });
  };

  updateUserById =(req,res,next) => {}

}

const authCtrl = new AuthController();

export default authCtrl;
