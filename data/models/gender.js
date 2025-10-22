import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelizeClient.js";

export class Gender extends Model {}

Gender.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    sequelize,
    modelName: "Gender",
    tableName: "gender"
});