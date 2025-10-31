import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "./createChallenge.css";
import type { IGameDetails } from "../../../@types/game";

export function CreateChallenge() {
  const { id: gameId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [game, setGame] = useState<IGameDetails | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ✅ Vérification ajoutée ici
    if (!gameId) {
      setError("ID du jeu manquant dans l'URL");
      return;
    }

    const fetchGame = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(`http://localhost:3000/games/${gameId}`);
        console.log("données reçues :", data);
        setGame(data);
      } catch (e: unknown) {
        console.error("Erreur API axios:", e instanceof Error ? e.message : e);
        setError("Erreur lors du chargement du jeu");
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [gameId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Vérification supplémentaire
    if (!gameId) {
      setError("ID du jeu manquant");
      return;
    }

    if (!title.trim() || !description.trim()) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      // ✅ Amélioration de la gestion du token
      if (!token) {
        setError("Vous devez être connecté pour créer un challenge");
        return;
      }

      const { data } = await axios.post(
        `http://localhost:3000/games/${gameId}/challenges`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log("Challenge créé:", data);
      navigate(`/games/${gameId}`);
      setTitle("");
      setDescription("");
    } catch (e: unknown) {
      console.error(
        "Erreur lors de la création:",
        e instanceof Error ? e.message : e
      );
      setError("Erreur lors de la création du challenge");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Gestion d'erreur si pas d'ID
  if (!gameId) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="alert alert-error">
          <span>ID du jeu manquant. Veuillez accéder à cette page depuis un jeu spécifique.</span>
        </div>
      </div>
    );
  }

  if (loading && !game) return <div className="flex justify-center"><span className="loading loading-spinner loading-lg"></span></div>;
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
