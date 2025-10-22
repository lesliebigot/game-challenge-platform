import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelizeClient.js";

export class Role extends Model {}

Role.init({
    name: {
        type: DataTypes.TEXT,
        defaultValue: "visitor",
    },
}, {
    sequelize,
    modelName: "Role",
    tableName: "role"
});