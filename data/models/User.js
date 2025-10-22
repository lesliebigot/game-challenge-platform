import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelizeClient.js";

export class Game extends Model {}

User.init({
    pseudo: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    firstname: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    sequelize,
    modelName: "User",
    tableName: "user"
});
