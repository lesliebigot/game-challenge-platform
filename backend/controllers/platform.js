import { Platform } from "../models/platform.js";

export const platformController = {
  
  async getOne(req, res) {
    const platformId = parseInt(req.params.id, 10);
    const platform = await Platform.findByPk(platformId);

    if (!platform) {
      return res.status(404).json({ error: "Plateforme non trouvée" });
    }

    res.json(platform);
  },
};