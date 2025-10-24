import { Role } from "../database/models/index.js";

export const roleController = {
  
  async getOne(req, res) {
    // Récupération de l'id du rôle
    const roleId = parseInt(req.params.id, 10);
    // Recherche du rôle par son id
    const role = await Role.findByPk(roleId);
    // Gestion d'une erreur
    if (!role) {
      return res.status(404).json({ error: "Rôle non trouvé" });
    }
    // Renvoi des données
    res.json(role);
  },
};