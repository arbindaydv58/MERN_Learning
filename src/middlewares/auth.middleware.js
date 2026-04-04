const checkLogin = () => {
  return (res, req, next) => {
    try {
      console.log("I am in checkLogin Middleware");
      next();
    } catch (exception) {
      next(exception);
    }
  };
};


export default checkLogin