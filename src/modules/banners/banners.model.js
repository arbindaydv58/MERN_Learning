const { DataTypes } = require("sequelize");
import { Status } from "../../config/constant.js";
import { Sequelize } from "sequelize";

const BannerModel = Sequelize.afterDefine("banner", {
  _id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    // unigue:true, =
    defaultValue: DataTypes.UUIDV4(),
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  status: {
    type: DataTypes.ENUM(Object.values(Status)),
    defaultValue: Status.INACTIVE,
  },
  image: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Date.now(),
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Date.now(),
    onUpdate: Date.now(),
  },
});

module.exports = BannerModel;
