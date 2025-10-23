import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelizeClient.js";

export class Game extends Model {}

Game.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "https://images.igdb.com/igdb/image/upload/t_cover_big/image_id.jpg",
    },
}, {
    sequelize,
    modelName: "Game",
    tableName: "game"
});
