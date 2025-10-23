import {User} from "../models/user.js";
import argon2 from "argon2";
import { userSignupSchema } from "../schemas/userSchema.js";


export const userController = {
  
  async getAll(req, res) {
    const users = await User.findAll();
    if(!users) return res.status(404).json("Aucun Type dans la base");
    res.status(200).json(users);
  },

  async createOne(req, res) {
    
    // Validation des données avec Zod
    const parsed = userSignupSchema.safeParse(req.body);
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

    const data = parsed.data; // Données validées et nettoyées

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