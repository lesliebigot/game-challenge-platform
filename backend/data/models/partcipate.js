import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelizeClient.js";

// table de liaison pour la participation entre User et Challenge avec ajout de l'attribut "proof"

export class Participate extends Model {}

Participate.init({
    proof: {
        type: DataTypes.STRING, // URL ou chemin vers la preuve de participation
    },
}, {
    sequelize,
    modelName: "Participate",
    tableName: "participate"
});