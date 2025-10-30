import { Router } from "express";
import { gameController } from "./controllers/game.js";
import { challengeController } from "./controllers/challenge.js";
//import { profilController } from "./controllers/profil.js";
import { userController } from "./controllers/user.js";
import { authentificationController } from "./controllers/authentification.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

export const router = Router();

// Tous les challenges avec créateur + jeu associé + participations + likes
router.get("/challenges", challengeController.getAll); 
// Les 3 challenges les plus likés
router.get("/challenges/top-liked", challengeController.getTopLiked);
// Un challenge avec créateur + jeu associé + participations + likes
router.get("/challenges/:id", challengeController.getOne);
// Tous les jeux avec challenges associés
router.get("/games", gameController.getAll);
// Un jeu avec challenges associés + éditeur + plateformes + genre associés
router.get("/games/:id", gameController.getOne);
// Profil - Récupérer les challenges liés à l'utilisateur connecté
router.get("/users", userController.getAll);
// Un seul user avec ses challenges créés et participés, et ses jeux favoris
router.get("/users/:id", authMiddleware, userController.getOne);

// Route pour valider le token
router.get("/api/auth/validate-token", authMiddleware, (req, res) => {
  // Si on arrive ici, c'est que le token est valide (grâce au middleware)
  res.json({ valid: true, userId: req.user.id });
});


// Créer un challenge
router.post("/games/:id/challenges", authMiddleware, challengeController.createOne);
// Créer un user
router.post("/register", userController.createOne);
// participer à un challenge
router.post("/challenges/:id/participate", authMiddleware, challengeController.submitToChallenge);

// modifier son challenge
router.patch("/challenges/:id", authMiddleware, challengeController.updateOne);
// supprimer son challenge
router.delete("/challenges/:id", authMiddleware, challengeController.deleteOne);

// modifier sa participation à un challenge
router.patch("/challenges/:id/participate", challengeController.updateParticipation);
// supprimer sa participation à un challenge
router.delete("/challenges/:id/participate", challengeController.deleteParticipation);

// TODO liker/disliker un challenge (évolution possible)
// router.post("/challenges/:id/like", authMiddleware, challengeController.likeChallenge);
// router.post("/challenges/:id/dislike", authMiddleware, challengeController.dislikeChallenge);


router.patch("/challenges/:id/participate", authMiddleware, challengeController.updateParticipation);
// supprimer sa participation à un challenge
router.delete("/challenges/:id/participate", authMiddleware, challengeController.deleteParticipation);
// se connecter 
router.post("/signin", authentificationController.signin);


