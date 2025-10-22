import {Challenge} from "../models/challenge.js";
import { User } from "../models/user.js";

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
};