export const favoriteGameController = {
  async getFavorite(req, res) {
    const favoriteGame = if (!req.user) return res.status(401).json({ error: "Non authentifié" });
  const user = await User.findByPk(req.user.id, {
    include: { model: Game, as: "favoriteGames" }
  });
  res.json(user.favoriteGames);
  },
};
