import { useContext } from "react";
import UserContext from "./userContext";

// on à préparer un custom hook (une fonction qui peut utiliser les hooks (useState, useEffect, useContext ...) et qui doit etre executée uniquement dans un composant)
// de n'importe quel composant on pourra recuperer le context en executant cette fonction
export default function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "Erreur il manque le provider du context donc le context est undefined",
    );
  }
  // ici on renvoie le context on est sur qu'il est pas undefined
  return context;
}
