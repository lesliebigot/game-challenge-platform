import { Challenge, User } from "../data/models/index.js";
import { createChallengeSchema } from "../schemas/challengeSchema.js";
import { participateChallengeSchema } from "../schemas/challengeSchema.js";

export const challengeController = {
  
  async getAll(req, res, next) {
    const challenges = await Challenge.findAll();
    //console.log(challenges);
    //res.status(200).json(challenges);
    req.challenges = challenges; // on stocke le résultat dans req
    next();
  },

  async getOne(req, res) {
    
    const challengeId = parseInt(req.params.id, 10);
    const challenge = await Challenge.findByPk(challengeId);

    if (!challenge) {
      return res.status(404).json({ error: "Jeu non trouvé" });
    }

    res.status(200).json(challenge);
  },

  //async getTopLiked(req, res) {
  //  
  //  const topChallenges = await Challenge.findAll({
  //    include: [
  //      {
  //        model: User,
  //        as: "likedByUsers", // nom de l'association dans notre modèle
  //        attributes: [], // on ne veut pas les infos des users
  //        through: { attributes: [] }, // on cache la table de liaison
  //      },
  //    ],
  //    attributes: {
  //      include: [
  //        // ajoute le nombre de likes
  //        [
  //          Challenge.sequelize.fn("COUNT", Challenge.sequelize.col("likedByUsers.id")),
  //          "likeCount",
  //        ],
  //      ],
  //    },
  //    group: ["Challenge.id"], // groupement pour le COUNT
  //    order: [[Challenge.sequelize.literal("likeCount"), "DESC"]], // tri décroissant
  //    limit: 3, // on garde les 3 premiers
  //  });
//
  //  res.json({challenges: req.challenges, topChallenges,});
  //},

  async createOne(req, res) {
  
    // Validation des entrées
    const parsed = createChallengeSchema.safeParse(req.body);
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
    
    // Création du challenge
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

  async submitToChallenge(req, res) {

    // Validation des entrées
    const parsed = participateChallengeSchema.safeParse(req.body);
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
  }
};