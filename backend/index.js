// imports
import "dotenv/config";
import express from "express";
import { router } from "./router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import csurf from "csurf";


export const app = express();

// Autoriser les requêtes venant de http://localhost:5173 (votre frontend)
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // ✅ Autorise l'envoi de cookies
}));

// Middleware pour parser les cookies
app.use(cookieParser());

// Middleware pour la protection CSRF
app.use(csurf({ cookie: true }));

// on a besoin d'un parser pour récuperer les données en json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route pour récupérer le token CSRF (nécessaire pour le frontend)
app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

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

app.listen(PORT, () => {
  console.log(`🚀 l'api a démarré sur http://localhost:${PORT}`);
});
