// Création des tables avec Sequelize
import { sequelize } from "../models/index.js";

console.log("🚧 Création des tables");
// on peut synchroniser tous les modèles d'un coup, en utilisant la method sync directement sur sequelize (le client)
// force true : supprimer la table si elle existe, puis la créer
// À utiliser uniquement en développement.
await sequelize.sync({ force: true });

// fermer la connexion
sequelize.close();

console.log("✅ Tables créées");
