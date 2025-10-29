import { z } from "zod";

export const createChallengeSchema = z.object({
  title: z.string()
    .min(3, "Le titre du challenge est trop court")
    .max(30, "Le titre du challenge est trop long"),
  description: z.string()
    .min(10, "La description du challenge est trop courte")
    .max(500, "La description du challenge est trop longue"),
});

// .partial() permet de réutiliser un schema en rendant toutes les propriétés optionnelles
export const updateChallengeSchema = createChallengeSchema.partial(); 

// avec Z.url l'url doit forcement commencé par http:
//Pour forcer l'URL à commencer par https:// (et non http://).
//il faut ajouter une validation personnalisée avec .refine()
export const participateChallengeSchema = z.object({
  proof: z.url().refine(
    (url) => url.startsWith("https://"),
    { message: "L'URL de la preuve doit être valide, l’URL doit commencer par https://" }
  )
});