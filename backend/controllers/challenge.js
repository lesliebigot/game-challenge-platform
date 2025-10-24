import { Challenge, User, Participate } from "../database/models/index.js";
//import { createChallengeSchema } from "../schemas/challengeSchema.js";
//import { participateChallengeSchema } from "../schemas/challengeSchema.js";

export const challengeController = {
  
  async getAll(req, res) {
    // Recherche de tous les modèles Challenge
    const challenges = await Challenge.findAll({
      include: [{
        association: "participantUsers",             
      }]
    });
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
    const challenge = await Challenge.findByPk(challengeId,{
      include: [{
        association: "participantUsers",             
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
    //const parsed = createChallengeSchema.safeParse(req.body);

    // Gestion d'une erreur Zod
    //if (!parsed.success) {
    //  const fieldErrors = {};
  
    //for (const err of parsed.error.errors) {
    //  const field = err.path[0]; 
    //  if (!fieldErrors[field]) {
    //    fieldErrors[field] = [];
    //  }
    //  fieldErrors[field].push(err.message);
    //}

    //return res.status(400).json({ errors: fieldErrors });
    //}
    
    // Récupère les données validées et netoyées par Zod
    const { title, description } = req.body;
    const game_id = 12; // TODO remplacer par l'ID du jeu approprié
    const user_id = 1;  // TODO À remplacer par l'ID du de l'utilisateur conn

    // Associe le nouvel objet créé à l'utilisateur connecté
    //data.creator_id = req.user.id;
    
    // Création du challenge
    const challenge = await Challenge.create({title, description, user_id, game_id });

    // Renvoi des données
    res.status(201).json({
      message: "Challenge créé avec succès",
      challenge: {
        id: challenge.id,
        title: challenge.title,
        description: challenge.description,
        user_id, 
        game_id
      },
    });
  },

  async submitToChallenge(req, res) {

    /* // Validation des données avec Zod
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
    const data = parsed.data; */

    // Récupère l'id de l'utilisateur et du challenge
    // const userId = req.user.id;
    const challengeId = parseInt(req.params.id, 10);

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

    // Crée la participation
    const participation = await Participate.create({
      user_id: /*userId*/1,
      challenge_id: challengeId,
      proof: /*data*/req.body.proof,
      // proof_description: data.description
    });

    // Renvoi des données
    res.status(201).json({
      message: "Participation enregistrée avec succès",
      participation: {
        id: participation.id,
        user_id: /*userId*/1,
        challenge_id: challengeId,
        url: /*data*/req.body.proof,
        // description: data.description
      }
    });
  },

  async updateOne(req, res) {
    // TODO : user_id du challenge = id du user connecté en condition pour pouvoir modifier le challenge
    // récuperer les informations de modifications (elles sont fournies en json sur le body)
    let data = req.body;
    // valider la data
    //data = updateListSchema.parse(data);

    // récuperer ET valider l'id du challenge à modifier (fourni dans l'url)
    //const { id } = idSchema.parse(req.params);
    const id = parseInt(req.params.id, 10);

    // récuperer le challenge concerné
    const challenge = await Challenge.findByPk(id);

    // est ce que ce challenge existe ?
    if (!challenge) {
      return res.status(404).json({ error: "challenge non trouvé" });
    }

    // modifier la liste récuperée avec les données fournies
    await challenge.update(data);

    // retourner la liste modifiée en json avec le status 200
    res.json(challenge);
  },

  // Supprimer un challenge par son id
  async deleteOne(req, res) {
    // TODO : user_id du challenge = id du user connecté en condition pour pouvoir supprimer le challenge
    // récuperer ET valider l'id du challenge à modifier (fourni dans l'url)
    //const { id } = idSchema.parse(req.params);
    const id = parseInt(req.params.id, 10);
    
    // récuperer la liste concernée
    const challenge = await Challenge.findByPk(id);

    // est ce que cette liste existe ?
    if (!challenge) {
      return res.status(404).json({ error: "challenge non trouvé" });
    }

    // supprimer ce challenge
    await challenge.destroy();

    // retourner une reponse vide avec le code 204
    res.status(204).json();
  },
};