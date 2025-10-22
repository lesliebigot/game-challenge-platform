import { Role } from "../models/role.js";

export const roleController = {
  async getOne(req, res) {
    const roleId = parseInt(req.params.id, 10);
    const role = await Role.findByPk(roleId);

    if (!role) {
      return res.status(404).json({ error: "Rôle non trouvé" });
    }

    res.json(role);
  },
};