import { Challenge } from "../models/challenge.js";
import { User } from "../models/user.js";
import { challengeSchema } from "../schemas/userSchema.js";

export const challengeController = {
  
  async getAll(req, res, next) {
    const challenges = await Challenge.findAll();
    req.challenges = challenges; // on stocke le résultat dans req
    next();
  },

  async getTopLiked(req, res) {
    
    const topChallenges = await Challenge.findAll({
      include: [
        {
          model: User,
          as: "likedBy", // nom de l'association dans notre modèle
          attributes: [], // on ne veut pas les infos des users
          through: { attributes: [] }, // on cache la table de liaison
        },
      ],
      attributes: {
        include: [
          // ajoute le nombre de likes
          [
            Challenge.sequelize.fn("COUNT", Challenge.sequelize.col("likedBy.id")),
            "likeCount",
          ],
        ],
      },
      group: ["Challenge.id"], // groupement pour le COUNT
      order: [[Challenge.sequelize.literal("likeCount"), "DESC"]], // tri décroissant
      limit: 3, // on garde les 3 premiers
    });

    res.json({challenges: req.challenges, topChallenges,});
  },

  async createOne(req, res) {
  
    // Validation des entrées
    const parsed = challengeSchema.safeParse(req.body);
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
    
    const data = parsed.data;
    
    // Création de l'utilisateur
    const challenge = await Challenge.create(data);

    res.status(201).json({
      message: "Challenge créé avec succès",
      challenge: {
        id: challenge.id,
        title: challenge.title,
        description: challenge.description,
      },
    });
  },
};