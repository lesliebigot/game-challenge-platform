import { useState, useContext } from "react";
import axios from "axios";
import useUserContext from "../../context/useUserContext";
import { useNavigate } from "react-router";
{/* connexion */}

export function SignIn(){
  // STATE jwt et pseudo sont maintenant dans le context USerContext
  const { userId, pseudo, login, logout } = useUserContext();

  // STATE pour l'erreur de login
  const [error, setError] = useState<null | string>(null);

  const navigate = useNavigate();

  const checkCrendentials = async (email: string, password: string) => {
    try {
      // on envoie au back sur le endpoint /signin l'email et password
      const response = await axios.post(
        "http://localhost:3000/signin",
        {
          email: email,
          password: password,
        },
      );
      const token = response.data.token;
      const pseudo = response.data.user.pseudo;
      const userId = response.data.user.id;
      if (token) {
        login(response.data.token, response.data.user.pseudo);
        localStorage.setItem("authToken", token);// ! ATTENTION aux failles XSS, bien se protéger pour ne pas se faire voler le token
        localStorage.setItem("pseudo", pseudo);// ! ATTENTION aux failles XSS, bien se protéger pour ne pas se faire voler le token
        localStorage.setItem("userId", userId);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Plus besoin d’ajouter manuellement l’en-tête dans chaque requête.
        navigate("/profil");
      } else {
        setError("Connexion échouée : pas de token reçu");
      }
      // si ici on reçoit une 200 c'est que les credentials étaient ok donc on affiche un message bienvenu + pseudo
      // on veut executer la fonction login qui va set les state jwt et pseudo du context, on recupère grace à useContext
      console.log(response.data.token, response.data.user.pseudo);
    } catch (e) {
      // si on reçoit une 401 unauthorised c'est que il y a une erreur de email ou password on va afficher une erreur
      console.log("erreur");
      setError("Email ou mot de passe incorrect");
    }
  };

  return(
    <> 
      <div className="flex items-center justify-center px-4 pt-10 pb-10">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 pixel-font text-center">Page de connexion</h1>
          <form 
            action={(formData) => {
              // avec cette prop action le preventdefault du submit est fait automatiquement !
              // on récupère email et pass dans le formdata et on envoie au back
              const email = formData.get("email") as string;
              const password = formData.get("password") as string;
              // on veut l'envoyer au back
              checkCrendentials(email, password);
            }}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6">
  
              <label className="label">Email
                <input name="email" type="email" className="input w-full" placeholder="Email" required />
              </label>
  
              <label className="label">Mot de passe
                <input name="password" type="password" className="input w-full" placeholder="Mot de passe" required/>
              </label>
  
              <button type="submit" className="btn btn-primary mt-4 w-full">Se connecter</button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}   


