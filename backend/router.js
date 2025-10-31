import { Router } from "express";
import { gameController } from "./controllers/game.js";
import { challengeController } from "./controllers/challenge.js";
import { userController } from "./controllers/user.js";
import { authentificationController } from "./controllers/authentification.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { checkEntityRbac } from "./middlewares/checkUserRbac.js";

export const router = Router();

// GET
// Tous les challenges avec créateur + jeu associé + participations + likes
router.get("/challenges", challengeController.getAll);
// Les challenges les plus likés
router.get("/challenges/top-liked", challengeController.getTopLiked);
// Les challenges les plus récent
router.get("/challenges/recent", challengeController.getRecentChallenges);
// Un challenge avec créateur + jeu associé + participations + likes
router.get("/challenges/:id", challengeController.getOne);
// Tous les jeux avec challenges associés
router.get("/games", gameController.getAll);
// Les jeux trié par ordre décroissant du nombre de challenges
router.get("/games/most-challenged", gameController.getGamesWithMostChallenges);
// Un jeu avec challenges associés + éditeur + plateformes + genre associés
router.get("/games/:id", gameController.getOne);
// Profil - Récupérer les challenges liés à l'utilisateur connecté
router.get("/users", userController.getAll);
// Un seul user avec ses challenges créés et participés, et ses jeux favoris
router.get("/users/:id", authMiddleware, userController.getOne);

//TOKEN
router.get("/api/auth/validate-token", authMiddleware, (req, res) => {
  // Si on arrive ici, c'est que le token est valide (grâce au middleware)
  res.json({ valid: true });
});
// Route pour rafraîchir le token
router.post("/api/auth/refresh-token", authentificationController.refreshToken);

//POST
// Créer un challenge
router.post(
  "/games/:id/challenges",
  authMiddleware,
  //checkEntityRbac("challenge"),
  challengeController.createOne
);
// Créer un user
router.post("/register", userController.createOne);
// participer à un challenge
router.post(
  "/challenges/:id/participate",
  authMiddleware,
  //checkEntityRbac("challenge"),
  challengeController.submitToChallenge
);

//PATCH / DELETE
// modifier son challenge
router.patch(
  "/challenges/:id",
  authMiddleware,
  //checkEntityRbac("challenge"),
  challengeController.updateOne
);
// supprimer son challenge
router.delete(
  "/challenges/:id",
  authMiddleware,
  //checkEntityRbac("challenge"),
  challengeController.deleteOne
);

// modifier sa participation à un challenge
router.patch(
  "/challenges/:id/participate",
  authMiddleware,
  //checkEntityRbac("challenge"),
  challengeController.updateParticipation
);
// supprimer sa participation à un challenge
router.delete(
  "/challenges/:id/participate",
  authMiddleware,
  //checkEntityRbac("challenge"),
  challengeController.deleteParticipation
);

// TODO liker/disliker un challenge (évolution possible)
// router.post("/challenges/:id/like", authMiddleware, challengeController.likeChallenge);
// router.post("/challenges/:id/dislike", authMiddleware, challengeController.dislikeChallenge);

// se connecter
router.post("/signin", authentificationController.signin);
// supprimer un user
router.delete("/users/:id", authMiddleware, userController.deleteOne);

// Modifier un user
// router.patch("/users/:id");
