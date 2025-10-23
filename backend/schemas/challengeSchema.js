import { z } from "zod";

export const createChallengeSchema = z.object({
  title: z.string()
    .min(3, "Le titre du challenge est trop court")
    .max(30, "Le titre du challenge est trop long"),
  description: z.string()
    .min(10, "La description du challenge est trop courte")
    .max(500, "La description du challenge est trop longue"),
});

export const participateChallengeSchema = z.object({
  URL: z.url("L’URL doit être valide")
    .refine((val) => val.startsWith("https://"), {
      message: "L’URL doit commencer par https://",
    }),
  description: z.string()
    .min(10, "La description du challenge est trop courte")
    .max(500, "La description du challenge est trop longue"),
});