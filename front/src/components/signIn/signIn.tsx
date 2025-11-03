import { useEffect, useState } from "react";
import axios from "axios";
import useUserContext from "../../context/useUserContext";
import { useNavigate } from "react-router";

export function SignIn() {
  // STATE jwt, pseudo et userID sont maintenant dans le context USerContext
  const { login } = useUserContext();
  // STATE pour l'erreur de login
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();
  const [csrfToken, setCsrfToken] = useState(""); // Ajout de l'état pour le token CSRF

  // Récupère le token CSRF dès le montage du composant
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/csrf-token", { withCredentials: true })
      .then((res) => setCsrfToken(res.data.csrfToken));
  }, []);

  const checkCredentials = async (email: string, password: string) => {
    try {
      console.log("Tentative de connexion avec :", email); // Log l'email
      console.log("Token CSRF récupéré :", csrfToken); // Log le token CSRF

      const response = await axios.post(
        "http://localhost:3000/signin",
        { email, password },
        {
          withCredentials: true, // Envoie les cookies
          headers: {
            "X-CSRF-Token": csrfToken, // Ajoute le token CSRF
          },
        }
      );
      console.log("Réponse du serveur :", response.data); // Log la réponse complète
      const { user } = response.data;
      if (user) {
        // Met à jour le contexte avec les données utilisateur
        // Le token est dans le cookie, pas besoin de le passer ici
        login("dummy-token", user.pseudo, user.id); // "dummy-token" car le vrai token est dans le cookie
        localStorage.setItem("pseudo", user.pseudo); // Seul le pseudo reste dans localStorage
        localStorage.setItem("userId", user.id.toString());
        axios.defaults.withCredentials = true; // Active les cookies pour toutes les requêtes axios
        navigate("/profil");
      } else {
        setError("Connexion échouée : pas de token reçu");
        console.log(error);
      }
    } catch (e) {
      setError("Email ou mot de passe incorrect");
      console.error("Erreur de connexion :", e);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center px-4 pt-10 pb-10">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 pixel-font text-center">
            Page de connexion
          </h1>
          <form
            action={async (formData) => {
              const email = formData.get("email") as string;
              const password = formData.get("password") as string;
              await checkCredentials(email, password);
            }}
          >
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="input w-full"
                placeholder="Email"
                required
              />

              <label htmlFor="password" className="label">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="input w-full"
                placeholder="Mot de passe"
                required
              />

              <button type="submit" className="btn btn-primary mt-4 w-full">
                Se connecter
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}
