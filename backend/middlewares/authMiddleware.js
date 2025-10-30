import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // On récupère l'en tête HTTP envoyé par le client
  const authHeader = req.headers.authorization;
  // On vérifie la présence d'un token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ valid: false, message: "Token manquant ou mal formaté" });
  }
  // On découpe la tableau obtenu et ne récupèrer que la deuxième partie
  const token = authHeader.split(" ")[1];
  try {
    // Vérifier le token avec la clé secrète
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Si le token est valide, retourner une réponse positive
    res.json({ valid: true, userId: decoded.userId, roleId : decoded.roleId });
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    // Si le token est invalide/expiré, retourner une réponse négative
    res.status(401).json({ valid: false, message: "Token invalide ou expiré" });
  }
  next();
  
};