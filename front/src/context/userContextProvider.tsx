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
  };

  // On prépare une fonction logout qui vide le pseudo et le userId du localStorage et du state et supprime le header Authorization d'Axios
  const logout = async () => {
    try {
      await axios.get("http://localhost:3000/logout", {
        withCredentials: true
      });
    } catch (error) {console.error("Erreur lors de la déconnexion :", error);};

    // Supprimer les données du localStorage
    localStorage.removeItem("pseudo");
    localStorage.removeItem("userId");
    
    // Réinitialiser les states
    setJwt(null);
    setPseudo(null);
    setUserId(null);
  };

  // Rafraîchir le token
  const refreshToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/refresh-token",
        {},
        { withCredentials: true } // Envoie les cookies
      );
      if (response.data.token) {
        setJwt(response.data.token); // Met à jour le contexte (optionnel)
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erreur lors du rafraîchissement du token :", error);
      return false;
    }
  };

  // Intercepteur pour rafraîchir le token en cas de 401
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const success = await refreshToken();
          if (success) {
            return axios(originalRequest); // Réessaye la requête originale
          }
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);
  
  // Vérifie la connexion au montage
  useEffect(() => {
    try {
      const storedPseudo = localStorage.getItem("pseudo");
      const storedUserId = localStorage.getItem("userId");

      if (storedPseudo && storedUserId) {
        axios.get("http://localhost:3000/api/auth/validate-token", {
          withCredentials: true, // Envoie les cookies
        })
          .then((response) => {
            if (response.data.valid) {
              login("dummy-token", storedPseudo, Number(storedUserId)); // Le vrai token est dans le cookie
            } else {
              logout();
            }
          })
          .catch(() => logout());
      }
    } catch (error) {
      console.error("Erreur :", error);
      logout();
    }
  }, []);
  
  return (
    <UserContext.Provider value={{ jwt, pseudo, login, logout, userId }}>
      {children}
    </UserContext.Provider>
  );
}
