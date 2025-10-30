
import { z } from "zod";
import { entityRolePermissions } from "../permissions/rbac.js";

// mapping entre la méthode HTTP et l"action (create, read, update, delete) pour les associer
const methodToAction = {
  GET: "read",
  POST: "create",
  PATCH: "update",
  DELETE: "delete"
};

//valider le rôle de l'utilisateur récupéré depuis les headers HTTP pour garantir la sécurité.
//Si une valeur en dehors de ces trois est fournie, une erreur de validation sera levée.
const RoleSchema = z.enum(["admin", "user", "anonymous"]).default("anonymous");

//Objectif: Vérifier si l"utilisateur faisant la requête a les permissions nécessaires
 
export const checkEntityRbac = (entity) => async (req, res, next) => {
  // Déterminer le rôle : "admin", "user", ou "anonymous"
  const userRole = req.user ? RoleSchema.parse(req.user.role) : "anonymous";

  // Vérifier que l'entité existe
  if (!entityRolePermissions[entity]) {
    return res.status(500).json({ message: "Entité invalide pour RBAC." });
  }

  // Pour l'entité passée en paramètre, je vais récupérer les permissions de l'utilisateur en fonction de son rôle
  const permissions = entityRolePermissions[entity][userRole];
  if (!permissions) {
    return res.status(500).json({ message: "Rôle non trouvé pour cette entité." });
  }

  // Pour connaître l'action qui est réalisée (create, read, update, delete)
  // Je vais utiliser la méthode HTTP
  const method = req.method.toUpperCase();
  // J'associe la méthode à l'action => d"une methode HTTP, je vais récupérer l'action (create, read, update, delete)
  const action = methodToAction[method];
  // Ainsi, je récupère la permission de l"utilisateur pour l'action
  const permission = permissions[action];

  // Vérifier la permission => Si l'utilisateur n'a pas la permission, je renvoie une erreur
  if(permission === "no") {
    if(userRole === "anonymous") {
      // 401 => tu n'as pas le droit, tu dois te connecter
      res.status(401).json({
        message:  "Non autorisé : connectez-vous." 
      });
      return;
    }
    // 403 => tu es connecté, mais tu n'as pas le droit
    res.status(403).json({
      message: "Accès interdit pour cette action."
    });
    return;
  }

  // Transmettre la permission et l'ID de l'utilisateur
  // Ainsi, on pourra faire la distinction entre les permissions "yes" et "self" -- dans les controllers 
  // "yes" => pas de filtre
  // "self" => je dois filtrer les données sur l"utilisateur connecté
  req.permission = permission; // "yes" ou "self"
  req.userId = req.user?.id;   // ID de l'utilisateur (pour les filtres "self")
  next();
};