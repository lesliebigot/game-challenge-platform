import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./createChallenge.css";

export function CreateChallenge(){
  const { id: gameId } = useParams<{ id: string }>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [game, setGame] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      if (!gameId) return;
      
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(`http://localhost:3000/games/${gameId}`);
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
    
    if (!title.trim() || !description.trim()) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem("token"); // Assurez-vous d'avoir le token d'authentification
      
      const { data } = await axios.post(
        `http://localhost:3000/games/${gameId}/challenges`,
        { title, description },
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      
      console.log("Challenge créé:", data);
      // Rediriger ou afficher un message de succès
      setTitle("");
      setDescription("");
    } catch (e: unknown) {
      console.error("Erreur lors de la création:", e instanceof Error ? e.message : e);
      setError("Erreur lors de la création du challenge");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !game) return <div>Chargement...</div>;
  if (error && !game) return <div>Erreur: {error}</div>;

  return (
    <> 
      <div>
        <div className="flex justify-center">
          <img 
            src={game?.image } 
            alt={game?.title } 
            className="img mt-5"
          />    
        </div>
        <div className="flex items-center justify-center px-4 pt-10 pb-10">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 pixel-font text-center">
              Créer un challenge {game?.title && `pour ${game.title}`}
            </h1>
            
            {error && (
              <div className="alert alert-error mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6">
                <label className="label">Titre du challenge</label>
                <input 
                  type="text" 
                  className="input w-full" 
                  placeholder="Titre du challenge"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={loading}
                />

                <label className="label">Description du challenge</label>
                <textarea 
                  className="textarea w-full" 
                  placeholder="Description du challenge"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={loading}
                />

                <button 
                  type="submit"
                  className="btn btn-primary mt-4 w-full"
                  disabled={loading}
                >
                  {loading ? "Création..." : "Valider"}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}