import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelizeClient.js";

export class Editor extends Model {}

Editor.init({
  name: {
    type: DataTypes.STRING
  },
}, {
  sequelize,
  modelName: "Editor",
  tableName: "editor"
});