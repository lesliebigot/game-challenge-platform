import { Type } from "../models/type.js";

export const typeController = {
  
  async getOne(req, res) {
    const typeId = parseInt(req.params.id, 10);
    const type = await Type.findByPk(typeId);

    if (!type) {
      return res.status(404).json({ error: "Type non trouvé" });
    }

    res.json(type);
  },
};