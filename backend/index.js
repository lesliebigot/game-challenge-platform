// imports
import "dotenv/config";
import express from "express";
import { router } from "./router.js";
import cors from "cors";
//import { authMiddleware } from "./middlewares/authMiddleware.js";


export const app = express();

// Autoriser les requêtes venant de http://localhost:5173 (frontend)
app.use(cors({
  origin: "http://localhost:5173",
}));

// middleware de gestion des permissions RBAC : Vérifie le JWT et définit req.user
//app.use(authMiddleware);
//app.use((req, res, next) => {
//  // Juste pour tester
//  console.log(req.user);
//  next();
//});

// on a besoin d'un parser pour récuperer les données en json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const PORT = process.env.PORT || 3000;

app.use(router);

// Try/Catch global
 
app.use((error, req, res, next) => {
  console.error("Erreur globale :", error);

  // Si la réponse a déjà été envoyée, passe au middleware suivant
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Une erreur interne est survenue.",
  });
});

// TODO factoriser la gestion des erreurs 500 dans un middleware
// TODO gestion globale des erreurs 404 dans un midddleware

app.listen(PORT, () => {
  console.log(`🚀 l'api a démarré sur http://localhost:${PORT}`);
});
