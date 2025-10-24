import { Genre } from "../data/models/index.js";

export const typeController = {
  
  async getOne(req, res) {
    // Récupération de l'id de l'editeur
    const typeId = parseInt(req.params.id, 10);
    // Recherche du type par son id
    const type = await Genre.findByPk(typeId);
    // Gestion d'une erreur
    if (!type) {
      return res.status(404).json({ error: "Type non trouvé" });
    }
    // Renvoi des données
    res.json(type);
  },
};