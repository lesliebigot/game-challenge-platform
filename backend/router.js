import { Router } from "express";
import { gameController } from "./controllers/game.js";
import { challengeController } from "./controllers/challenge.js";
//import { profilController } from "./controllers/profil.js";
import { userController } from "./controllers/user.js";
//import { authentificationController } from "./controllers/authentification.js";
//import { authMiddleware } from "./middlewares/authMiddleware.js";

export const router = Router();

// Tous les challenges 
router.get("/challenges", challengeController.getAll); 
// Un challenge 
router.get("/challenges/:id", challengeController.getOne);
// Tous les jeux avec challenges associés
router.get("/games", gameController.getAll);
// Un jeu avec challenges associés + éditeur + plateformes + genre associés
router.get("/games/:id", gameController.getOne);
// Profil - Récupérer les challenges liés à l'utilisateur connecté
router.get("/users", userController.getAll);
// Un seul user avec ses challenges créés et participés
router.get("/users/:id", /*authMiddleware,*/ userController.getOne);
//router.get("/profil/challenges", authMiddleware, profilController.getUserChallenges);

// Créer un challenge
router.post("/challenges", challengeController.createOne);
// Créer un user
router.post("/register", userController.createOne);

//router.post("/signin", authentificationController.signin);
//router.post("/challenge", authMiddleware, challengeController.createOne);
//router.post("/challenge/:id/participate", authMiddleware, challengeController.submitToChallenge);
//
//router.patch("challenge");
//router.patch("particpate");
//router.patch("profil");
//
//router.delete("/challenge");
//router.delete("/participate");
