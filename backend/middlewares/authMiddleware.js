import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // On récupère l'en tête HTTP envoyé par le client
  const authHeader = req.headers.authorization;
  // On vérifie la présence d'un token
  if (!authHeader) {
    return res.status(401).json({ error: "Token manquant" });
  }
  // On découpe la tableau obtenu et ne récupèrer que la deuxième partie
  const token = authHeader.split(" ")[1];
  // On vérifie la validité du token 
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = { id: decoded.id };
  next();
  
};