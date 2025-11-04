import "dotenv/config";
import { Sequelize } from "sequelize";
const sequelize = new Sequelize(
  "postgresql://gamer:p28sEI8h479ztuOKrbmZFC9P22GbEGFk@dpg-d44s1egdl3ps73bj1f7g-a.frankfurt-postgres.render.com/gamer_mlhc",
  {
    logging: false,
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
    define: {
      underscored: true, // Utiliser le format snake_case pour les noms de colonnes
      createdAt: "created_at", // Nom de la colonne pour la date de création
      updatedAt: "updated_at", // Nom de la colonne pour la date de mise à jour
    },
  }
);

export default sequelize;
