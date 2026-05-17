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
        code: exception?.code || 400,
        message: "Validation Failed",
        status: "VALIDATION_FAILED",
        details: {},
      };

      if (Array.isArray(exception?.details)) {
        exception.details.forEach((errorObj) => {
          const field = errorObj?.path?.[errorObj.path.length - 1] || "unknown";
          error.details[field] = errorObj.message;
        });
      } else {
        error.message = exception?.message || error.message;
      }

      next(error);
    }
  };
};

export default bodyValidator;
