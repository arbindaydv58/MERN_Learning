import mongoose from "mongoose";
import { mongoConfig } from "./config.js";

(async () => {
  try {
    await mongoose.connect(mongoConfig.url, {
      dbName: mongoConfig.dbName,
      autoCreate: true,
      autoIndex: true,
    });
    console.log("*** MongoDB Server Connected ***");
  } catch (exception) {
    console.error("*** MongoDB connection error***");
  }
})();
