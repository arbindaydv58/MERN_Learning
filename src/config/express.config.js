import express from "express";
import "./mongo.config.js";
import router from "./router.config.js";
const app = express();

//*Parsers body
//Json
app.use(express.json());
//x-www-from-urlencode()
app.use(express.urlencoded({ extended: true }));

//static middleware
app.use("/assets", express.static("./public/uploads"));

app.use("/api/v1/", router);

app.use((req, res, next) => {
  next({
    code: 404,
    message: "Responce not found...",
    status: "NOT_FOUND_ERR",
  });
});

//error handling middleware
app.use((error, req, res, next) => {
   console.log("grabage collrctor:",error)
  let statusCode = error.statusCode|| 500;
  let details = error.details || null;
  let msg = error.message || "Internal server Error...";
  let status = error.status || "SERVER_ERROR";

  //*mongodb unique failed case
  if (error.name === "MongoServerError") {
    statusCode = 400;
    msg = "DB Error";
    status = "DB_ERROR";
    details = {};

    if (+error.code === 11000) {
      Object.keys(error.keyPattern).map((field) => {
        details[field] = `${field} should be unique`;
      });
    }
  }

  res.status(statusCode).json({
    error: details,
    message: msg,
    status: status,
    Option: null,
  });
});

export default app;
