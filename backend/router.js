import { Router } from "express";
import { gameController } from "./controllers/game.js";
import { challengeController } from "./controllers/challenge.js";
import { profilController } from "./controllers/profil.js";

export const router = Router();

router.get("/", challengeController.getAll, challengeController.getTopLiked);
router.get("/games", gameController.getAll);
router.get("/games/:id", gameController.getOne, gameController.getGameChallenges);
router.get("/profil/challenges", profilController.getUserChallenges);

router.post("/");
