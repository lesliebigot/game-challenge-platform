import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // Récupère le token depuis le cookie
  const token = req.cookies.authToken;
  
  if (!token) {
    return res.status(401).json({ 
      error: "Non autorisé. Veuillez vous connecter." 
    });
  }

  try {
    // Vérifie et décode le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Stocke les infos utilisateur dans req.user
    req.user = {
      id: decoded.id,
      role: decoded.role,// "admin" ou "user"
    };
    
    next();
  } catch (error) {
    console.error("Erreur de vérification du token:", error);
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expiré. Veuillez vous reconnecter." });
    }
    
    return res.status(401).json({ error: "Token invalide." });
  }
};