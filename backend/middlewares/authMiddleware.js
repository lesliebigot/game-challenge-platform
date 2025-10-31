import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // On récupère l'en tête HTTP envoyé par le client
  const authHeader = req.headers.authorization;
  // On vérifie la présence d'un token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //return res.status(401).json({ valid: false, message: "Token manquant ou mal formaté" });
    // Si pas de token, on passe au middleware suivant (req.user restera undefined)
    return next();
  // Récupère le token depuis le cookie (au lieu des headers)
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ error: "Token manquant" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // On stocke id et role dans req.user
    req.user = {
      id: decoded.id,
      role: decoded.role, // "admin" ou "user"     
    };
    next();
    // Si le token est valide, retourner une réponse positive
    //res.json({ valid: true, userId: decoded.userId, roleId : decoded.roleId });
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return res.status(401).json({ error: "Token invalide ou expiré" });
  }
};
