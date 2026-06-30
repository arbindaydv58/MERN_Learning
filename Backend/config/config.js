import { sqlConfig } from "../src/config/config.js"


module.exports={
  "development": {
    "username": sqlConfig.username,
    "password": sqlConfig.password,
    "database": sqlConfig.database,
    "host": sqlConfig.host,
    "port": Number(sqlConfig.port),
    "dialect": `${sqlConfig.dialect}`
  },
  "test": {
   "username": sqlConfig.username,
    "password": sqlConfig.password,
    "database": sqlConfig.database,
    "host": sqlConfig.host,
    "port": Number(sqlConfig.port),
    "dialect": `${sqlConfig.dialect}`
  },
  "production": {
    "username": sqlConfig.username,
    "password": sqlConfig.password,
    "database": sqlConfig.database,
    "host": sqlConfig.host,
    "port": Number(sqlConfig.port),
    "dialect": `${sqlConfig.dialect}`
  }
}
