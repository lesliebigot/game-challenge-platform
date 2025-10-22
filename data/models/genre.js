import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelizeClient.js";

export class Genre extends Model {}

Genre.init({
    name: {
        type: DataTypes.SRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: "Genre",
    tableName: "genre"
});