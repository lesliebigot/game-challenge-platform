import { User } from "../models/user.js";
import argon2 from "argon2";
import { userSigninSchema } from "../schemas/userSchema.js";

export const authentificationController = {

  async signin(req, res) {

    // Validation des entrées
    const parsed = userSigninSchema.safeParse(req.body);
    if (!parsed.success) {
      const fieldErrors = {};

      for (const err of parsed.error.errors) {
        const field = err.path[0]; 
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field].push(err.message);
      }

      return res.status(400).json({ errors: fieldErrors });
    }
  
    const { email, password } = parsed.data;
  
    // Recherche de l’utilisateur
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Identifiants incorrects" });
    }
  
    // Vérification du mot de passe
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