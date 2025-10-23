import {Game} from "../models/game.js";
import {Challenge} from "../models/challenge.js";

export const gameController = {

  async getAll(req, res) {

    // Recherche de tous les modèles Game
    const games = await Game.findAll();
    // Gestion d'une erreur
    if(!games) return res.status(404).json("Aucun Jeu dans la base");
    // Renvoi des données
    res.status(200).json(games);
  },

  async getOneWithChallenges(req, res) {
    // Récupération de l'id du jeu
    const gameId = parseInt(req.params.id, 10);

    // On récupère le jeu et ses challenges en une seule requête
    const game = await Game.findByPk(gameId, {
      include: [
        {
          model: Challenge,
          as: "challenges", // S'assurer que l'association Game.hasMany(Challenge, { as: "challenges" }) existe
        },
      ],
    });
    // Gestion d'une erreur
    if (!game) {
      return res.status(404).json({ error: "Jeu non trouvé" });
    }

    // Retourne le jeu et ses challenges
    res.json(game);
  },
  
};