import { Router } from "express";
import { gameController } from "./controllers/game.js";
import { challengeController } from "./controllers/challenge.js";
import { profilController } from "./controllers/profil.js";
import { userController } from "./controllers/user.js";
import { authentificationController } from "./controllers/authentification.js";

export const router = Router();

router.get("/", challengeController.getAll, challengeController.getTopLiked);
router.get("/games", gameController.getAll);
router.get("/games/:id", gameController.getOne, gameController.getGameChallenges);
router.get("/profil/challenges", profilController.getUserChallenges);

router.post("/register", userController.createOne);
router.post("/signin", authentificationController.signin);
router.post("/challenge");
router.post("/participate");

router.patch("challenge");
router.patch("particpate");
router.patch("profil");

router.delete("/challenge");
router.delete("/participate");