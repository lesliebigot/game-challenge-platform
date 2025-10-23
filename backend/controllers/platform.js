import { Platform } from "../models/platform.js";

export const platformController = {
  
  async getOne(req, res) {
    // Récupération de l'id de la plateforme
    const platformId = parseInt(req.params.id, 10);
    // Recherche de la plateforme par son id
    const platform = await Platform.findByPk(platformId);
    // Gestion d'une erreur
    if (!platform) {
      return res.status(404).json({ error: "Plateforme non trouvée" });
    }
    // Renvoi des données
    res.json(platform);
  },
};