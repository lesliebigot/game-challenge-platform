import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./createChallenge.css";
import type { IGameDetails } from "../../../@types/game";

// ✅ Configuration globale d'Axios pour envoyer les cookies
axios.defaults.withCredentials = true;

export function CreateChallenge() {
  const { id: gameId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<IGameDetails | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

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

  // ✅ Chargement des données du jeu
  useEffect(() => {
    if (!gameId) {
      setError("ID du jeu manquant dans l'URL");
      return;
    }
    const fetchGame = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(
          `http://localhost:3000/games/0${gameId}`,
          { withCredentials: true }
        );
        setGame(data);
      } catch (e: unknown) {
        setError("Erreur lors du chargement du jeu");
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [gameId]);

  // ✅ Soumission avec récupération du token CSRF à jour
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameId) {
      setError("ID du jeu manquant");
      return;
    }
    if (!title.trim() || !description.trim()) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    if (description.trim().length < 5) {
      setError("La description du challenge est trop courte ");
      return;
    }
    if (!isAuthenticated) {
      setError("Vous devez être connecté pour créer un challenge");
      return;
    }
    try {
      setLoading(true);
      setError(null);

      // ↪️ Récupère le token CSRF juste avant le POST
      const res = await axios.get("http://localhost:3000/api/csrf-token", {
        withCredentials: true,
      });
      const csrfToken = res.data.csrfToken;

      // ⬇️ Création du challenge avec le token CSRF valide
      const { data } = await axios.post(
        `http://localhost:3000/games/${gameId}/challenges`,
        { title, description },
        {
          withCredentials: true,
          headers: {
            "X-CSRF-Token": csrfToken,
          },
        }
      );
      navigate(`/games/0${gameId}`);
      console.log(data);
    } catch (e: unknown) {
      setError("Erreur lors de la création du challenge");
    } finally {
      setLoading(false);
    }
  };

  if (!gameId) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="alert alert-error">
          <span>
            ID du jeu manquant. Veuillez accéder à cette page depuis un jeu
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
            Vous devez être connecté pour créer un challenge.{" "}
            <a href="/signin" className="link">
              Se connecter
            </a>
            .
          </span>
        </div>
      </div>
    );
  }

  if (loading && !game)
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (error && !game) return <div className="alert alert-error">{error}</div>;

  return (
    <div>
      <div className="flex justify-center">
        <img src={game?.image} alt={game?.title} className="img mt-5" />
      </div>
      <div className="flex items-center justify-center px-4 pt-10 pb-10">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 pixel-font text-center">
            Créer un challenge {game?.title && `pour ${game.title}`}
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
                    Création...
                  </>
                ) : (
                  "Valider"
                )}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}
