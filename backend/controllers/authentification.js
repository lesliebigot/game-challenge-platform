import { User } from "../database/models/index.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const authentificationController = {
  async signin(req, res) {
    try {
      const { email, password } = req.body;
      
      // Recherche de l'utilisateur
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: "Identifiants incorrects" });
      }
      
      // Vérification du mot de passe
      const isPasswordValid = await argon2.verify(user.password, password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Identifiants incorrects" });
      }
      
      // Déterminer le rôle à partir de role_id
      const role = user.role_id === 2 ? "admin" : "user";
      
      // Génération du token JWT avec le ROLE (IMPORTANT!)
      const token = jwt.sign(
        { 
          id: user.id,
          role: role  // Le rôle doit être dans le token principal
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      
      // Génération du refresh token
      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      
      // Envoie le token principal dans un cookie HTTP-only
      res.cookie("authToken", token, {
        httpOnly: true,
        secure: false, // false en développement, true en production (HTTPS)
        sameSite: "strict", 
        maxAge: 3600000, // 1 heure
        path: "/" //pour les redirections
      });
      
      // Envoie TOUJOURS le refresh token (supprimé la condition if(!token))
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // false en développement, true en production (HTTPS)
        sameSite: "strict", 
        maxAge: 604800000, // 7 jours
        path: "/" 
      });
      
      // Renvoi des données (sans renvoyer le token en clair)
      res.status(200).json({
        message: "Connexion réussie",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          pseudo: user.pseudo,
          role: role, // ajout du rôle en clair pour le frontend
          roleId: user.role_id
        }
        // ne pas renvoyer le token en JSON, il est déjà dans le cookie
      });
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      res.status(500).json({ error: "Erreur lors de la connexion" });
    }
  },
  
  // Fonction pour rafraîchir le token
  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.cookies;
      
      if (!refreshToken) {
        return res.status(401).json({ error: "Refresh token manquant" });
      }
      
      // Vérifie le refresh token
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
      
      // Récupère l'utilisateur pour avoir son rôle
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé" });
      }
      
      const role = user.role_id === 2 ? "admin" : "user";
      
      // Génère un nouveau token avec le ROLE
      const newToken = jwt.sign(
        { 
          id: decoded.id,
          role: role  // Important d'inclure le rôle
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      
      // Met à jour le cookie authToken
      res.cookie("authToken", newToken, {
        httpOnly: true,
        secure: false, // false en développement
        sameSite: "strict", 
        maxAge: 3600000,
        path: "/"
      });
      
      res.json({ 
        message: "Token rafraîchi avec succès",
        user: {
          id: user.id,
          pseudo: user.pseudo,
          role: role
        }
      });
    } catch (error) {
      console.error("Erreur lors du refresh token:", error);
      return res.status(401).json({ error: "Refresh token invalide ou expiré" });
    }
  },
};
