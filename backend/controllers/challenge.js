import { Challenge } from "../models/challenge.js";
import { User } from "../models/user.js";
import { Participate } from "../models/participate.js";
import { createChallengeSchema } from "../schemas/challengeSchema.js";
import { participateChallengeSchema } from "../schemas/challengeSchema.js";

export const challengeController = {
  
  async getAll(req, res, next) {
    // Recherche de tous les modèles Challenge
    const challenges = await Challenge.findAll();
    // Gestion d'une erreur
    if(!challenges) return res.status(404).json("Aucun challenge dans la base");
    // On stocke le resultat dans req
    req.challenges = challenges; 
    // On appelle la prochaine fonction pour la page d'accueil
    next();
  },

  async getOne(req, res) {
    // Récupération de l'id du challenge
    const challengeId = parseInt(req.params.id, 10);
    // Recherche du challenge par son id
    const challenge = await Challenge.findByPk(challengeId);
    // Gestion d'une erreur
    if (!challenge) {
      return res.status(404).json({ error: "Jeu non trouvé" });
    }
    // Renvoi des données
    res.status(200).json(challenge);
  },

  async getTopLiked(req, res) {
    // Recherche de tous les challenges 
    const topChallenges = await Challenge.findAll({
      // qui ont au moins 1 like
      include: [
        {
          model: User,
          as: "likedByUsers", 
          attributes: [],     // on ne récupère pas les infos users
          through: { attributes: [] } // on ne récupère pas la table de liaison
        }
      ],
      // Sélectionne quelles colonnes récupérer
      attributes: {
        include: [
          [
            // Appel de la fonction COUNT via sequelize
            Challenge.sequelize.fn("COUNT", 
              // Cible directement la colonne dans la base de données
              Challenge.sequelize.col("likedByUsers.id")),
            // Nom donné à la colonne formée
            "likeCount"
          ]
        ]
      },
      // Groupement nécessaire pour utiliser COUNT avec d'autres colonnes
      group: ["Challenge.id"],
      // Trie les résultats selon la colonne calculée likeCount.
      order: [[Challenge.sequelize.literal("likeCount"), "DESC"]],
      limit: 3
    });
    // Renvoi des données
    res.json({ topChallenges });
  },

  async createOne(req, res) {
  
    // Validation des données avec Zod
    const parsed = createChallengeSchema.safeParse(req.body);

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

    // Associe le nouvel objet créé à l'utilisateur connecté
    data.creator_id = req.user.id;
    
    // Création du challenge
    const challenge = await Challenge.create(data);

    // Renvoi des données
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

    // Validation des données avec Zod
    const parsed = participateChallengeSchema.safeParse(req.body);

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

    // Récupère l'id de l'utilisateur et du challenge
    const userId = req.user.id;
    const challengeId = parseInt(req.params.id, 10);

    // Vérifie que le challenge existe
    const challenge = await Challenge.findByPk(challengeId);
    if (!challenge) {
      return res.status(404).json({ error: "Challenge non trouvé" });
    }

    // Vérifie si l'utilisateur a déjà participé
    const existingParticipation = await Participate.findOne({
      where: { user_id: userId, challenge_id: challengeId }
    });
    if (existingParticipation) {
      return res.status(400).json({ error: "Vous avez déjà participé à ce challenge." });
    }

    // Crée la participation
    const participation = await Participate.create({
      user_id: userId,
      challenge_id: challengeId,
      proof: data.URL,
      // proof_description: data.description
    });

    // Renvoi des données
    res.status(201).json({
      message: "Participation enregistrée avec succès",
      participation: {
        id: participation.id,
        user_id: userId,
        challenge_id: challengeId,
        url: data.URL,
        // description: data.description
      }
    });
  }
};