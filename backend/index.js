// imports
import "dotenv/config";
import express from "express";
import { router } from "./router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import csurf from "csurf";

export const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://projet-gamer-challenges-1.onrender.com",
];
// Autoriser les requêtes venant de http://localhost:5173 (frontend)
app.use(
  cors({
    origin: (origin, callback) => {
      // Autorise les requêtes sans origin (ex: curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
  })
);

// Middleware pour parser les cookies
app.use(cookieParser());

// on a besoin d'un parser pour récuperer les données en json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware pour la protection CSRF
const csrfProtection = csurf({ cookie: true });

// Appliquer le middleware CSRF AVANT la route csrf-token
app.use(csrfProtection);

// Route pour récupérer le token CSRF APRÈS le middleware CSRF
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

// TODO factoriser la gestion des erreurs 500 dans un middleware
// TODO gestion globale des erreurs 404 dans un midddleware

app.listen(PORT, () => {
  console.log(`🚀 l'api a démarré sur http://localhost:${PORT}`);
});
