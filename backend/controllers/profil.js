import {Challenge, User} from "../data/models/index.js";

export const profilController = {async getUserChallenges(req, res) {
    
  const userId = req.user.id; // à récupérer via le middleware d'authenfication
  const createdChallenges = await Challenge.findAll({
    where: { creator_id: userId}
  });
  const likedChallenges = await Challenge.findAll({
    include: [{
      model: User,
      where: { id: userId },
      through: { attributes: [] } // table de liaison entre user et challenge à créer
    }]
  });
  const registedChallenges = await Challenge.findAll({
    where: { participant_id: userId}
  });

  res.json(likedChallenges, createdChallenges, registedChallenges);
},
};