import { Game, Challenge } from "../data/models/index.js";

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

  async getOne(req, res, next) {
    
    const gameId = parseInt(req.params.id, 10);
    // Vérifier que l'ID est valide
    if (isNaN(gameId)) {
      return res.status(400).json({ error: "ID invalide" });
    }
    const game = await Game.findByPk(gameId,{
      include: [{
        association: "challenges",
        attributes: ["id","title", "description"]       
      }]
    });

    if (!game) {
      return res.status(404).json({ error: "Jeu non trouvé" });
    }
    //console.log(game);
    res.status(200).json(game);
    //req.game = game; // on stocke le résultat dans req pour la prochaine fonction
    //next(); // passe à getGameChallenge
  },

  async getGameChallenges(req, res) {

    const game = req.game;

    const challenges = await Challenge.findAll({
      where: { game_id: game.id}
    });

    res.json(game, challenges);
  }
  
};