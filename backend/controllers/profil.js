import {Challenge, User} from "../data/models/index.js";

export const profilController = {async getUserChallenges(req, res) {
    
  // Récupère l'id de l'utilisateur dans le JWT d'athentification
  const userId = req.user.id; 
  // Effectue les 3 requêtes en simultané puis retourne un tableau
  const [createdChallenges, likedChallenges, registedChallenges] = await Promise.all([
    // Recherche tous les challenges créés par l'utilisateur identitfié
    Challenge.findAll({ where: { creator_id: userId } }),
    // Recherche tous les challenges likés par l'utilisateur identifié
    Challenge.findAll({
      include: [{
        model: User,
        where: { id: userId },
        through: { attributes: [] }
      }]
    }),
    // Recherche tous les challenges auquel l'utilisateur identifié participe
    Challenge.findAll({ where: { participant_id: userId } }),
  ]);
    // Renvoi des données
  res.json({
    createdChallenges,
    likedChallenges,
    registedChallenges
  });
},
};