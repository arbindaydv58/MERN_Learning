class AuthController {
  registerUser = (req, res, next) => {
    try {
      const data = req.body;
      const file = req.file;

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
