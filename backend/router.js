import { Router } from "express";
import { gameController } from "./controllers/game.js";
import { challengeController } from "./controllers/challenge.js";
import { profilController } from "./controllers/profil.js";

export const router = Router();

router.get("/", challengeController.getAll);
router.get("/games", gameController.getAll);
router.get("/profil/challenges", profilController.getUserChallenges);
