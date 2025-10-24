import {User} from "../database/models/index.js";
import argon2 from "argon2";
import { userSignupSchema } from "../schemas/userSchema.js";

export const userController = {
  
  async getAll(req, res) {
    // Recherche de tous les modèles User
    const users = await User.findAll();
    // Gestion d'une erreur
    if(!users) return res.status(404).json("Aucun Type dans la base");
    // Renvoi des données
    res.status(200).json(users);
  },
  async getOne(req, res) {
    // Récupération de l'id du user
    const userId = parseInt(req.params.id, 10);
    // Recherche du user par son id
    const user = await User.findByPk(userId,{
      include: [{
        association: "createdChallenges",
        attributes: ["id","title", "description"]       
      },
      {
        association: "participatedChallenges",
        attributes: ["id","title", "description"]       
      }]
    });
    // Gestion d'une erreur
    if (!user) {
      return res.status(404).json({ error: "Jeu non trouvé" });
    }
    // Renvoi des données
    res.status(200).json(user);
  },

  async createOne(req, res) {
    
    // Validation des données avec Zod
    const parsed = userSignupSchema.safeParse(req.body);
    // Gestion d'une erreur Zod
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
    // Récupère les données validées et netoyées par Zod
    const data = parsed.data; 
    // Hachage du mot de passe avec Argon2
    if (data.password) {
      data.password = await argon2.hash(data.password);
    }
    // Création de l'utilisateur
    const user = await User.create(data);
    // Renvoi des données
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