import {User} from "../database/models/index.js";
import argon2 from "argon2";
import { userSignupSchema } from "../schemas/userSchema.js";
import { idSchema } from "../schemas/utils.js";

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
    // const userId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    // Recherche du user par son id
    const user = await User.findByPk(userId,{
      include: [{
        association: "createdChallenges",
        attributes: ["id","title", "description"]       
      },
      {
        association: "participatedChallenges",
        attributes: ["id","title", "description"]       
      },
      {
        association: "favoriteGames",            
      }
      ]
    });
    // Gestion d'une erreur
    if (!user) {
      return res.status(404).json({ error: "Jeu non trouvé" });
    }
    // Renvoi des données
    res.status(200).json(user);
  },

  async createOne(req, res) {
    
    const data = req.body;
    
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

  // Supprimer un user 
  async deleteOne(req, res) {
    
    const userId = idSchema.parse(req.params.id);   
    // récuperer le User concerné
    const user = await User.findByPk(userId);
    // est ce que ce user existe ?
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    // supprimer ce user
    await user.destroy();
    // retourner une reponse vide avec le code 204
    res.status(204).json();
  },

  // modifier son user
  async updateOne(req, res) {
    // récuperer les informations de modifications   
    let data = req.body;
    // valider ces infos
    data = userSignupSchema.parse(data);
    // récuperer et valider l'id du user à modifier
    const userId = idSchema.parse(req.params.id);   
    // récuperer le user concerné
    const user = await User.findByPk(userId);
    // est ce que ce user existe ?
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    // modifier le user récuperé avec les données fournies
    await user.update(data);
    // retourner le user en json avec le status 200
    res.json(user);
  },

};