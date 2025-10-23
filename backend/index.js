// imports
import "dotenv/config";
import express from "express";
import { router } from "./router.js";


export const app = express();

// on a besoin d'un parser pour récuperer les données en json
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(router);

// Try/Catch global
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("pages/500");
});

app.listen(PORT, () => {
  console.log(`🚀 l'api a démarré sur http://localhost:${PORT}`);
});
