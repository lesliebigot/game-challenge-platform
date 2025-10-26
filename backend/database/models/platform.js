import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelizeClient.js";

export class Platform extends Model {}

Platform.init({
  name: {
    type: DataTypes.STRING,
    defaultValue: "PC",
  },
}, {
  sequelize,
  modelName: "Platform",
  tableName: "platform"
});