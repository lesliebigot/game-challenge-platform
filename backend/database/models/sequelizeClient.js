import "dotenv/config";
import { Sequelize } from "sequelize";
  
const sequelize = new Sequelize(
  process.env.PG_URL,
  {
    logging: false,
    define: {
      underscored: true, // Utiliser le format snake_case pour les noms de colonnes
      createdAt: "created_at", // Nom de la colonne pour la date de création
      updatedAt: "updated_at", // Nom de la colonne pour la date de mise à jour 
    }
  }
);

export default sequelize;