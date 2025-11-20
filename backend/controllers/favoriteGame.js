import { User } from "../database/models/user.js";
import { Game } from "../database/models/game.js";

export const favoriteGameController = {
  async getFavorite(req, res, next) {
    try {
      // Si l'utilisateur n'est pas authentifié
      if (!req.user) {
        return res.status(401).json({ error: "Non authentifié" });
      }

      const user = await User.findByPk(req.user.id, {
        include: { model: Game, as: "favoriteGames" },
      });

      if (!user) {
        return res.status(404).json({ error: "Utilisateur introuvable" });
      }

      // On renvoie la liste des jeux favoris (ou un tableau vide par sécurité)
      return res.json(user.favoriteGames ?? []);
    } catch (error) {
      // Permet à ton middleware d'erreurs global de gérer l'erreur
      if (next) {
        return next(error);
      }
      console.error(error);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  },
};
