import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // Récupère le token depuis le cookie (au lieu des headers)
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ error: "Token manquant" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalide ou expiré" });
  }
};
