import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelizeClient.js";

export class Challenge extends Model {}

Challenge.init({
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    sequelize,
    modelName: "Challenge",
    tableName: "challenge"
});
