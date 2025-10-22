import {User} from "../models/user.js";

export const userController = {
  async getAll(req, res) {
    const users = await User.findAll();
    if(!users) return res.status(404).json("Aucun Pokemon dans la base");
    res.status(200).json(users);
  },
};