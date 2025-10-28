import { Game, Challenge } from "../database/models/index.js";

export const gameController = {

  async getAll(req, res) {
    //Récupère tous les jeux et leurs challenges associés
    const games = await Game.findAll({
      include: [{
        association: "challenges",
        attributes: ["id","title", "description"]       
      }]
    });

    if(!games) return res.status(404).json("Aucun Jeu dans la base");
    res.status(200).json(games);
  },

  async getOne(req, res, _next) {
    
    const gameId = parseInt(req.params.id, 10);
    // Vérifier que l'ID est valide
    if (isNaN(gameId)) {
      return res.status(400).json({ error: "ID invalide" });
    }
    const game = await Game.findByPk(gameId,{
      include: [{
        association: "challenges",
        attributes: ["id","title", "description"]       
      },
      {
        association: "Genre",
        attributes: ["id","name"]       
      },
      {
        association: "platforms",
        attributes: ["id","name"]       
      },
      {
        association: "editor",
        attributes: ["id","name"]       
      }]
    });

    if (!game) {
      return res.status(404).json({ error: "Jeu non trouvé" });
    }
    //console.log(game);
    return res.status(200).json(game);
    
  },

  async getGameChallenges(req, res) {

    const game = req.game;

    const challenges = await Challenge.findAll({
      where: { game_id: game.id}
    });

    res.json(game, challenges);
  }
  
};