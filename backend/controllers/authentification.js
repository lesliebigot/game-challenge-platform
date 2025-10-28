import { User } from "../database/models/index.js";
import argon2 from "argon2";
//import { userSigninSchema } from "../schemas/userSchema.js";
import jwt from "jsonwebtoken";

export const authentificationController = {

  async signin(req, res) {
    
    const { email, password } = req.body;
  
    // Recherche de l’utilisateur
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Identifiants incorrects" });
    }

    console.log(user);
  
    // Vérification du mot de passe
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Identifiants incorrects" });
    }

    // Renvoi des données
    res.status(200).json({
      message: "Connexion réussie",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" }),
    });
  },
};