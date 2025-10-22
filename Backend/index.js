// imports
import express from "express";

export const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 l'api a démarré sur http://localhost:${PORT}/api`);
});
//npm init -y


//npm install express / dotenv / --save-dev eslint + ? js eslint globals / pg / 
//npm install --save sequelize /npm install pg pg-hstore

// npm run dev

// Charger les variables d'environnement
//npm install dotenv
//mettre en premier



// Importer les dépendances
//npm install express



