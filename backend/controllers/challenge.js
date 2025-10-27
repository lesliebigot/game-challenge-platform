import { Challenge, Participate, User } from "../database/models/index.js";
import { createChallengeSchema, participateChallengeSchema, updateChallengeSchema } from "../schemas/challengeSchema.js";
import { idSchema } from "../schemas/utils.js";

export const challengeController = {
  
  async getAll(req, res) {
    // Recherche de tous les modèles Challenge
    const challenges = await Challenge.findAll({
      include: [{
        association: "participantUsers",            
      },
      {
        association: "likedByUsers",             
      }]
    });
    // Gestion d'une erreur
    if(!challenges) return res.status(404).json("Aucun challenge dans la base");
    // On renvoi les données
    res.status(200).json(challenges);
  },

  async getOne(req, res) {
    // Récupération et valider l'id du challenge
    const challengeId = idSchema.parse(req.params.id);
    // Recherche du challenge par son id
    const challenge = await Challenge.findByPk(challengeId,{
      include: [{
        association: "participantUsers",             
      },
      {
        association: "likedByUsers",             
      }]
    });
    // Gestion d'une erreur
    if (!challenge) {
      return res.status(404).json({ error: "Jeu non trouvé" });
    }
    // Renvoi des données
    res.status(200).json(challenge);
  },

  async getTopLiked(req, res) {
    // Permet de compter le nombre de fois ou l'association "likedByUsers" aparait dans chaque challenge
    // eslint-disable-next-line quotes
    const likeCount = Challenge.sequelize.literal('COUNT("likedByUsers"."id")');

    const topChallenges = await Challenge.findAll({
      attributes: {
        // ajoute les colonnes calculées par le COUNT de notre const likeCount
        include: [[likeCount, "likeCount"]], // le premier élément est l’expression SQL, le second est l’alias qui sera utilisé dans le JSON renvoyé
      },
      include: [ // fait une jointure avec un autre modèle
        {
          model: User,
          as: "likedByUsers",
          attributes: [],
          through: { attributes: [] },
        },
      ],
      group: ["Challenge.id"], // "], PostgreSQL exige que toutes les colonnes non-agrégées dans le SELECT soient dans le GROUP BY.
      subQuery: false, // 
      order: [[likeCount, "DESC"]],
      limit: 3,
    });
  
    res.status(200).json({ topChallenges });
  },

  async createOne(req, res) { 
    // Récupération et valider l'id du jeu
    const gameId = idSchema.parse(req.params.id);
    // Validation des données entrantes avec Zod
    // safeParse est une méthode de Zod (v4) qui valide les données d'entrée 
    // par rapport à un schéma et renvoie un objet indiquant la réussite ou l'échec, 
    // au lieu de générer une erreur.
    const parsed = createChallengeSchema.safeParse(req.body);
    // Gestion d'une erreur Zod
    if (!parsed.success) {
      const fieldErrors = {};

      for (const err of parsed.error.issues) {
        const field = err.path[0]; 
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field].push(err.message);
      }
      return res.status(400).json({ errors: fieldErrors });
    }
    // Récupère les données validées et netoyées par Zod
    const { title, description } = parsed.data;
    
    const user_id = 1;  // TODO À remplacer par l'ID du de l'utilisateur connecté
    // Associe le nouvel objet créé à l'utilisateur connecté
    //data.creator_id = req.user.id;
    
    // Création du challenge
    const challenge = await Challenge.create({title, description, user_id, game_id : gameId });
    // Renvoi des données
    res.status(201).json({
      message: "Challenge créé avec succès",
      challenge: {
        id: challenge.id,
        title: challenge.title,
        description: challenge.description,
        user_id: challenge.user_id,
        game_id: challenge.game_id
      },
    });
  },

  async submitToChallenge(req, res) {
    // Validation des données avec Zod
    const parsed = participateChallengeSchema.safeParse(req.body);
    // Gestion d'une erreur Zod
    if (!parsed.success) {
      const fieldErrors = {}; 
      for (const err of parsed.error.issues) {
        const field = err.path[0]; 
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field].push(err.message);
      }  
      return res.status(400).json({ errors: fieldErrors });
    }    
    // Récupère les données validées et netoyées par Zod
    const { proof } = parsed.data;
    // Récupèrer et valider l'id de l'utilisateur et du challenge
    //const userId = req.user.id;
    const challengeId = idSchema.parse(req.params.id);
    // Vérifie que le challenge existe
    const challenge = await Challenge.findByPk(challengeId);
    if (!challenge) {
      return res.status(404).json({ error: "Challenge non trouvé" });
    }
    // TODO Vérifier si l'utilisateur connecté a déjà participé à ce challenge
    /* const existingParticipation = await Participate.findOne({
      where: { user_id: userId, challenge_id: challengeId }
    });
    if (existingParticipation) {
      return res.status(400).json({ error: "Vous avez déjà participé à ce challenge." });
    }*/
    // Crée la participation
    const participation = await Participate.create({
      user_id: /*userId*/1,
      challenge_id: challengeId,
      proof: proof,
    });
    // Renvoi des données
    res.status(201).json({
      message: "Participation enregistrée avec succès",
      participation: {
        id: participation.id,
        user_id: /*userId*/1,
        challenge_id: challengeId,
        proof: participation.proof
      }
    });
  },

  // modifier son challenge
  async updateOne(req, res) {
    // TODO : user_id du créateur du challenge = id du user connecté en condition pour pouvoir modifier le challenge
    // récuperer les informations de modifications   
    let data = req.body;
    // valider ces infos
    data = updateChallengeSchema.parse(data);
    // récuperer et valider l'id du challenge à modifier
    const challengeId = idSchema.parse(req.params.id);   
    // récuperer le challenge concerné
    const challenge = await Challenge.findByPk(challengeId);
    // est ce que ce challenge existe ?
    if (!challenge) {
      return res.status(404).json({ error: "challenge non trouvé" });
    }
    // modifier le challenge récuperé avec les données fournies
    await challenge.update(data);
    // retourner le challenge en json avec le status 200
    res.json(challenge);
  },

  // Supprimer le challenge qu'on a créé
  async deleteOne(req, res) {
    // TODO : user_id créateur du challenge = id du user connecté en condition pour pouvoir supprimer le challenge
    // récuperer et valider l'id du challenge à supprimer
    const challengeId = idSchema.parse(req.params.id);   
    // récuperer le challenge concerné
    const challenge = await Challenge.findByPk(challengeId);
    // est ce que ce challenge existe ?
    if (!challenge) {
      return res.status(404).json({ error: "challenge non trouvé" });
    }
    // supprimer ce challenge
    await challenge.destroy();
    // retourner une reponse vide avec le code 204
    res.status(204).json();
  },

  async updateParticipation(req, res) {  
    // récuperer et valider l'id du challenge 
    const challengeId = idSchema.parse(req.params.id);   
    // Récupère l'id de l'utilisateur qui fait la requête
    // const userId = req.user.id;
    // Vérifie que le challenge existe
    const challenge = await Challenge.findByPk(challengeId);
    if (!challenge) {
      return res.status(404).json({ error: "Challenge non trouvé" });
    }
    // Vérifie si l'utilisateur a déjà participé
    /* const existingParticipation = await Participate.findOne({
      where: { user_id: userId, challenge_id: challengeId }
    });
    if (existingParticipation) {
      return res.status(400).json({ error: "Vous avez déjà participé à ce challenge." });
    }*/
    // Modifier sa participation
    const participation = await Participate.findByPk(challengeId);
    //vérifier que l'utilistateur qui souhaite modifier sa participation est bien celui qui a crée cette participation
    /*if (userId !== participation.user_id) {
      return res.status(403).json({ error: "Vous n'êtes pas autorisé à modifier cette participation." });
    }*/  
    // Validation des nouvelles données avec Zod
    const parsed = participateChallengeSchema.safeParse(req.body);
    // Gestion d'une erreur Zod
    if (!parsed.success) {
      const fieldErrors = {}; 
      for (const err of parsed.error.issues) {
        const field = err.path[0]; 
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field].push(err.message);
      }  
      return res.status(400).json({ errors: fieldErrors });
    }    
    await participation.update({
      proof: parsed.data.proof,    
    });
    // retourner la participation modifiée en json avec le status 200
    res.json(participation);
  },
  async deleteParticipation(req, res) {  
    // récuperer et valider l'id du challenge 
    const challengeId = idSchema.parse(req.params.id);  
    // Récupère l'id de l'utilisateur qui fait la requête
    // const userId = req.user.id;
    // Vérifie que la participation existe
    const participation = await Participate.findByPk(challengeId);
    if (!participation) {
      return res.status(404).json({ error: "Participation non trouvée" });
    }   
    //vérifier que l'utilistateur qui souhaite supprimer sa participation est bien celui qui a crée cette participation
    /*if (userId !== participation.user_id) {
      return res.status(403).json({ error: "Vous n'êtes pas autorisé à modifier cette participation." });
    }*/    
    await participation.destroy();
    // retourner une reponse vide avec le code 204
    res.status(204).json();
  },
};