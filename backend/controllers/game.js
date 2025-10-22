import {Game} from "../models/game.js";

export const gameController = {
  async getAll(req, res) {
    const games = await Game.findAll();
    if(!games) return res.status(404).json("Aucun Pokemon dans la base");
    res.status(200).json(games);
  },
};