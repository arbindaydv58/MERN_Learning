import { Sequelize } from "sequelize";
import { sqlConfig } from "./config.js";

const sequelize = new Sequelize(
  sqlConfig.database,
  sqlConfig.username,
  sqlConfig.password,
  {
    dialect: `${sqlConfig.dialect}`,
    host: sqlConfig.host,
    port: sqlConfig.port,
  },
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("*** SQL Server Connected ***");
  } catch (exception) {
    console.log("*** Error sql connection ****", exception);
  }
})();

export default sequelize;
