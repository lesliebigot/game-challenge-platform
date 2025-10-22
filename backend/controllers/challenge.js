import {Challenge} from "../models/challenge.js";

export const challengeController = {
  async getAll(req, res) {
    const challenges = await Challenge.findAll();
    if(!challenges) return res.status(404).json("Aucun Pokemon dans la base");
    res.status(200).json(challenges);
  },
};