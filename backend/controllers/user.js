import {User} from "../models/user.js";
import argon2 from "argon2";

export const userController = {
  
  async getAll(req, res) {
    const users = await User.findAll();
    if(!users) return res.status(404).json("Aucun Type dans la base");
    res.status(200).json(users);
  },

  async createOne(req, res) {
    const data = req.body;

    // Hachage du mot de passe avec Argon2
    if (data.password) {
      data.password = await argon2.hash(data.password);
    }

    // Création de l'utilisateur
    const user = await User.create(data);

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  },

};