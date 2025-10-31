import axios from "axios";
import { useNavigate } from "react-router";
import useUserContext from "../../context/useUserContext";
import { useEffect, useState } from "react";

export function Profil() {
  const { logout } = useUserContext();

  // Récupération directe dans localStorage (attention à la synchro avec contexte)
  const userIdFromStorage = localStorage.getItem("userId");
  const userId = userIdFromStorage ? Number(userIdFromStorage) : null;

  const [csrfToken, setCsrfToken] = useState(""); // CSRF token
  // Récupérer le token CSRF au montage
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/csrf-token", { withCredentials: true })
      .then((res) => {
        setCsrfToken(res.data.csrfToken);
      });
  }, []);

  const navigate = useNavigate();
  const deleteUser = async () => {
    if (!userId) {
      console.error("Erreur : userId non défini");
      return;
    }
    try {
      // on envoie au back sur le endpoint /signup les credentials
      const response = await axios.delete(
        `http://localhost:3000/users/${userId}`,
        {
          headers: { "X-CSRF-Token": csrfToken },
          withCredentials: true,
        }
      );
      console.log("Suppression de l'utilisateur", response);
    } catch (e) {
      console.error("Erreur signup:", e instanceof Error ? e.message : e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de page
    if (!userId) {
      alert("Impossible de supprimer : utilisateur non identifié.");
      return;
    }
    console.log("clique sur supprimer");
    deleteUser();
    logout();
    navigate("/");
  };

  return (
    <div className="h-full">
      <h1 className="text-3xl font-bold mb-6 pixel-font text-center mt-5">
        Mon profil
      </h1>
      <div className="grid grid-cols-1 content-center gap-5 mb-5 m-auto lg:max-w-2xl md:max-w-2xl sm:max-w-sm max-w-xs">
        {/* Formulaire de modification */}
        <form
          action=""
          className="fieldset bg-base-200 border-base-300 rounded-box border p-4 text-center"
        >
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-7">
            <fieldset className="max-w-96">
              <legend className="fieldset-legend">Email</legend>

              <label htmlFor="oldEmail" className="label">
                Ancien email
              </label>
              <input
                id="oldEmail"
                name="oldEmail"
                type="email"
                className="input"
                placeholder="Ancien email"
              />

              <label htmlFor="newEmail" className="label">
                Nouveau email
              </label>
              <input
                id="newEmail"
                name="newEmail"
                type="email"
                className="input"
                placeholder="Nouveau email"
              />
            </fieldset>

            <fieldset className="max-w-96">
              <legend className="fieldset-legend">Mot de passe</legend>

              <label htmlFor="oldPassword" className="label">
                Ancien mot de passe
              </label>
              <input
                id="oldPassword"
                name="oldPassword"
                type="password"
                className="input"
                placeholder="Ancien mot de passe"
              />

              <label htmlFor="newPassword" className="label">
                Nouveau mot de passe
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                className="input"
                placeholder="Nouveau mot de passe"
              />
            </fieldset>

            <fieldset className="max-w-96">
              <legend className="fieldset-legend">Pseudo</legend>

              <label htmlFor="oldPseudo" className="label">
                Ancien pseudo
              </label>
              <input
                id="oldPseudo"
                name="oldPseudo"
                type="text"
                className="input"
                placeholder="Ancien pseudo"
              />

              <label htmlFor="newPseudo" className="label">
                Nouveau pseudo
              </label>
              <input
                id="newPseudo"
                name="newPseudo"
                type="text"
                className="input"
                placeholder="Nouveau pseudo"
              />
            </fieldset>
          </div>
          <div>
            <button className="btn btn-neutral mt-4">Modifier</button>
          </div>
        </form>

        {/* Formulaire de suppression */}
        <form
          onSubmit={handleSubmit}
          className="flex justify-center fieldset bg-base-200 border-base-300 rounded-box  border p-4 text-center w-full max-w-sm mx-auto"
        >
          <fieldset className="max-w-80">
            <legend className="fieldset-legend">Supprimer le compte</legend>
            <label htmlFor="password" className="label">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="input"
              placeholder="Mot de passe"
            />

            <button className="btn btn-error mt-4">Supprimer mon compte</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
