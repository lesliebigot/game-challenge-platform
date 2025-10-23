import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelizeClient.js";

export class User extends Model {}

//La différence entre Sequelize.STRING et Sequelize.TEXT
// réside dans la longueur des données qu'ils peuvent stocker : 
// STRING est utilisé pour des chaînes de caractères de longueur limitée, 
// tandis que TEXT est destiné à des textes plus longs.

User.init({
  pseudo: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  lastname: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  firstname: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
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
