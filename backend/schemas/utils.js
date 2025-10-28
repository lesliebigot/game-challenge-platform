import { z } from "zod";

// Schema pour valider un ID dans les paramètres d'URL
export const idSchema = z.coerce.number().int().positive();
  
// .coerce.number() permet de convertir une chaine de caractere en nombre