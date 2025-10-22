import { User } from "../models/user.js";
import argon2 from "argon2";

export const authentificationController = {
  async signin(req, res) {
    const { email, password } = req.body;
  
    // Vérifie la présence des champs requis
    if (!email || !password) {
      return res.status(400).json({ error: "Email et mot de passe requis" });
    }
  
    // Recherche l'utilisateur en base
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Identifiants incorrects" });
    }
  
    // Vérifie le mot de passe via Argon2
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Identifiants incorrects" });
    }
  
    res.status(200).json({
      message: "Connexion réussie",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  },
};