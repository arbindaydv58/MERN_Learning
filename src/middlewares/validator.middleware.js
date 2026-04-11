const bodyValidator = (rules) => {
  return async (req, res, next) => {
    try {
      const payload = req.body;
      if (!payload) {
        throw {
          code: 422,
          message: "Data not Provided",
          status: "VALIDATION_FAILED_ERR",
        };
      }
      await rules.validateAsync(payload, { abortEarly: false });
      next();
    } catch (exception) {
      let error = {
        code: 400,
        message: "Validation Failed",
        status: "VALIDATION_FAILED",
        details: {},
      };
      exception.details.map((errorObj) => {
        let field = errorObj.path.pop();
        error.details[field] = errorObj.message;
      });
      // console.error(exception)
      next(error);
    }
  };
};

export default bodyValidator;
