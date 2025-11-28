import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./editChallenge.css";
import type { IChallenge } from "../../../@types/challenge";

// ✅ Configuration globale d'Axios pour envoyer les cookies
axios.defaults.withCredentials = true;

export function EditChallenge() {
  const { id: challengeId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<IChallenge | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // ✅ Vérification de l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/validate-token"
        );
        setIsAuthenticated(response.data.valid);
      } catch (e) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // ✅ Chargement des données du challenge
  useEffect(() => {
    if (!challengeId) {
      setError("ID du challenge manquant dans l'URL");
      return;
    }
    const fetchChallenge = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(
          `http://localhost:3000/challenges/${challengeId}`,
          { withCredentials: true }
        );
        setChallenge(data);
        setTitle(data.title);
        setDescription(data.description);
      } catch (e: unknown) {
        setError("Erreur lors du chargement du challenge");
      } finally {
        setLoading(false);
      }
    };
    fetchChallenge();
  }, [challengeId]);

  // ✅ Soumission de la modification
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!challengeId) {
      setError("ID du challenge manquant");
      return;
    }
    if (!title.trim() || !description.trim()) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    if (description.trim().length < 1) {
      setError("La description du challenge est trop courte");
      return;
    }
    if (!isAuthenticated) {
      setError("Vous devez être connecté pour modifier un challenge");
      return;
    }
    try {
      setLoading(true);
      setError(null);

      // ↪️ Récupère le token CSRF juste avant le PATCH
      const res = await axios.get("http://localhost:3000/api/csrf-token", {
        withCredentials: true,
      });
      const csrfToken = res.data.csrfToken;

      // ⬇️ Modification du challenge avec le token CSRF valide
      const { data } = await axios.patch(
        `http://localhost:3000/challenges/${challengeId}`,
        { title, description },
        {
          withCredentials: true,
          headers: {
            "X-CSRF-Token": csrfToken,
          },
        }
      );
      console.log("Challenge modifié:", data);
      // Rediriger vers la page du challenge
      navigate(`/challenges/${challengeId}`);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 403) {
          setError("Vous n'êtes pas autorisé à modifier ce challenge");
        } else if (e.response?.status === 404) {
          setError("Challenge non trouvé");
        } else {
          setError("Erreur lors de la modification du challenge");
        }
      } else {
        setError("Erreur lors de la modification du challenge");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Suppression du challenge
  const handleDelete = async () => {
    if (!challengeId) {
      setError("ID du challenge manquant");
      return;
    }
    try {
      setLoading(true);
      setError(null);

      // ↪️ Récupère le token CSRF
      const res = await axios.get("http://localhost:3000/api/csrf-token", {
        withCredentials: true,
      });
      const csrfToken = res.data.csrfToken;

      // ⬇️ Suppression du challenge
      await axios.delete(
        `http://localhost:3000/challenges/${challengeId}`,
        {
          withCredentials: true,
          headers: {
            "X-CSRF-Token": csrfToken,
          },
        }
      );
      // Rediriger vers la page des challenges
      navigate("/challenges");
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 403) {
          setError("Vous n'êtes pas autorisé à supprimer ce challenge");
        } else if (e.response?.status === 404) {
          setError("Challenge non trouvé");
        } else {
          setError("Erreur lors de la suppression du challenge");
        }
      } else {
        setError("Erreur lors de la suppression du challenge");
      }
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  if (!challengeId) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="alert alert-error">
          <span>
            ID du challenge manquant. Veuillez accéder à cette page depuis un challenge
            spécifique.
          </span>
        </div>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="alert alert-error">
          <span>
            Vous devez être connecté pour modifier un challenge.{" "}
            <a href="/signin" className="link">
              Se connecter
            </a>
            .
          </span>
        </div>
      </div>
    );
  }

  if (loading && !challenge)
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (error && !challenge) return <div className="alert alert-error">{error}</div>;

  return (
    <>
      <div>
        <div className="flex justify-center">
          <img src={challenge?.game?.image || "/images/bf6.webp"} alt={challenge?.game?.title || "game"} className="img mt-5" />
        </div>
        <div className="flex items-center justify-center px-4 pt-10 pb-10">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 pixel-font text-center">
              Modifier un challenge
            </h1>
            {error && <div className="alert alert-error mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6">
                <label htmlFor="title" className="label">
                  <span className="label-text">Titre du challenge</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Titre du challenge"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={loading}
                  required
                />
                <label htmlFor="description" className="label">
                  <span className="label-text">Description du challenge</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="textarea textarea-bordered w-full"
                  placeholder="Description du challenge"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={loading}
                  required
                />
                <button
                  type="submit"
                  className="btn btn-primary mt-4 w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Modification...
                    </>
                  ) : (
                    "Valider"
                  )}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
        <div className="flex justify-center">
          {!showDeleteConfirm ? (
            <button
              className="btn btn-warning mb-4"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={loading}
            >
              Supprimer le challenge
            </button>
          ) : (
            <div className="flex gap-2 mb-4">
              <button
                className="btn btn-error"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Suppression...
                  </>
                ) : (
                  "Confirmer la suppression"
                )}
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={loading}
              >
                Annuler
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}