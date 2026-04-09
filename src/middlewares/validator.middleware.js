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
      next(exception);
    }
  };
};

module.exports = bodyValidator;
