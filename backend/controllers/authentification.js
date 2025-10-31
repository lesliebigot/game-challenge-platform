import { User } from "../database/models/index.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const authentificationController = {
  async signin(req, res) {
    const { email, password } = req.body;

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

    // Génération du token JWT (1h) et du refresh token (7j)
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Envoie les tokens dans des cookies HTTP-only
    res.cookie("authToken", token, {
      httpOnly: true, // ✅ Le cookie n'est pas accessible via JavaScript
      secure: process.env.NODE_ENV === "production", // ✅ HTTPS en production
      sameSite: "strict", // ✅ Protection contre les CSRF
      maxAge: 3600000, // 1 heure (en ms)
    });

    if(!token){
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 604800000, // 7 jours (en ms)
      });
    }

    // Déterminer le rôle à partir de role_id
    // si roleID = 1 => user , si roleId = 2 => admin
    const role = user.role_id === 2 ? "admin" : "user";

    // Renvoi des données
    res.status(200).json({
      message: "Connexion réussie",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        pseudo: user.pseudo,
        roleId : user.role_id 
      },
      token: jwt.sign({ id: user.id, role: role }, process.env.JWT_SECRET, { expiresIn: "1h" }),
    });
  },

  // Nouvelle fonction pour rafraîchir le token
  async refreshToken(req, res) {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token manquant" });
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
      const newToken = jwt.sign(
        { id: decoded.id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Met à jour le cookie authToken
      res.cookie("authToken", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000,
      });

      res.json({ token: newToken }); // Optionnel : renvoyer le token en JSON pour le frontend
    } catch (error) {
      return res.status(401).json({ error: "Refresh token invalide" });
    }
  },
};
