import { useEffect, useState } from "react";
import UserContext from "./userContext";
import axios from "axios";

// ce composant contient les données global qu'on veut mettre dans le state
export default function UserContextProvider({ children }) {
  // STATE pour stocker le JWT
  const [jwt, setJwt] = useState<null | string>(null);
  // STATE pour le pseudo si pas null on est connecté
  const [pseudo, setPseudo] = useState<null | string>(null);
  // STATE pour useId si pas null on est connecté
  const[userId, setUserId]= useState<null | number>(null);

  // on prépare une fonction login qui met à jour les states , elle sera utilisée au moment de l'authentification de l'utilisateur (dans le submit du form du header)
  const login = (jwt: string, pseudo: string, userId: number) => {
    setJwt(jwt);
    setPseudo(pseudo);
    setUserId(userId);
    // Ajouter le header Authorization d'Axios
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  };

  // On prépare une fonction logout qui vide le token, le pseudo et le userId du localStorage et du state et supprime le header Authorization d'Axios
  const logout = () => {
    // Supprimer les données du localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("pseudo");
    localStorage.removeItem("userId");

    // Réinitialiser les states
    setJwt(null);
    setPseudo(null);
    setUserId(null);

    // Supprimer le header Authorization d'Axios
    delete axios.defaults.headers.common["Authorization"];
  };

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        // Valider le token auprès du backend
        axios.get("/api/auth/validate-token", {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
          .then((response) => {
            if (response.data.valid) {
              const storedPseudo = localStorage.getItem("pseudo");
              const storedUserId = localStorage.getItem("userId");
              if (storedPseudo && storedUserId) {
                login(storedToken, storedPseudo, Number(storedUserId));
                axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
              }
            } else {
              logout(); // Token invalide
            }
          })
          .catch(() => logout()); // Erreur réseau
      }
    } catch (error) {
      console.error("Erreur localStorage :", error);
      logout(); // En cas d'erreur, considérer l'utilisateur comme déconnecté
    }
  }, []);
  
  return (
    <UserContext.Provider value={{ jwt, pseudo, login, logout, userId }}>
      {children}
    </UserContext.Provider>
  );
}
