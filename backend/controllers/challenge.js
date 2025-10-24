import { Challenge, User, Participate } from "../data/models/index.js";
import { createChallengeSchema } from "../schemas/challengeSchema.js";
import { participateChallengeSchema } from "../schemas/challengeSchema.js";

export const challengeController = {
  
  async getAll(req, res) {
    // Recherche de tous les modèles Challenge
    const challenges = await Challenge.findAll();
    // Gestion d'une erreur
    if(!challenges) return res.status(404).json("Aucun challenge dans la base");
    // On stocke le resultat dans req
    req.challenges = challenges; 
    // On renvoi les données
    res.status(200).json(challenges);
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
    
    const topChallenges = await Challenge.findAll({
      include: [
        {
          model: User,
          as: "likedByUsers", // nom de l'association dans notre modèle
          attributes: [], // on ne veut pas les infos des users
          through: { attributes: [] }, // on cache la table de liaison
        },
      ],
      attributes: {
        include: [
          // ajoute le nombre de likes
          [
            Challenge.sequelize.fn("COUNT", Challenge.sequelize.col("likedByUsers.id")),
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