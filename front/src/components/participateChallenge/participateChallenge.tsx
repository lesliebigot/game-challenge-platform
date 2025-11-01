import axios from "axios";
import "./participateChallenge.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { IChallenge } from "../../../@types/challenge";

export function ParticipateChallenge(){
  const [error, setError] = useState<string | null>(null);
  const [proof, setProof] = useState("");
  const [loading, setLoading] = useState(false);
  const [challenge, setChallenge] = useState<IChallenge | null>(null);
  const navigate = useNavigate();
  const [csrfToken, setCsrfToken] = useState("");

  // Récupère le token CSRF au montage du composant
  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/csrf-token", { 
          withCredentials: true 
        });
        setCsrfToken(res.data.csrfToken);
      } catch (error) {
        console.error("Erreur lors de la récupération du token CSRF:", error);
        setError("Erreur de sécurité. Veuillez recharger la page.");
      }
    };
  
    fetchCSRFToken();
  }, []);
 
  // Récupère les données du challenge
  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get("http://localhost:3000/challenges/1", {
          withCredentials: true,
        }); 
        console.log("données reçues :", data);
        setChallenge(data);
      } catch (e: unknown) {
        console.error("Erreur API axios:", e instanceof Error ? e.message : e);
        setError("Erreur lors du chargement du challenge");
      } finally {
        setLoading(false);
      }
    };
    fetchChallenge();
  }, []); // (challengeId]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation du champ "proof"
    if (!proof.trim()) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    // Vérifie que le token CSRF est disponible
    if (!csrfToken) {
      setError("Token de sécurité manquant. Veuillez recharger la page.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.post(
        "http://localhost:3000/challenges/1/participate",
        { proof },
        {
          withCredentials: true,  // Important pour envoyer cookie HttpOnly
          headers: {
            "X-CSRF-Token": csrfToken
          },             
        }
      );
      alert(data.message);
      navigate("/games/1");
      setProof("");
    } catch (e) {
      console.error("Erreur API :", e);
      // Gestion d'erreur plus précise
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 403) {
          setError("Erreur de sécurité (CSRF). Veuillez recharger la page.");
        } else if (e.response?.status === 401) {
          setError("Vous devez être connecté pour participer.");
          navigate("/signin");
        } else {
          setError(e.response?.data?.message || "Erreur lors de la participation au challenge");
        }
      } else {
        setError("Une erreur inattendue est survenue");
      }
    } finally {
      setLoading(false);
    }
  };

  // Affichage pendant le chargement
  if (loading && !challenge) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <> 
      <div>
        <div className="flex justify-center">
          <img src="/images/bf6.webp" alt="battlefield 6" className="img mt-5"/>    
        </div>
        <div className="flex items-center justify-center px-4 pt-10 pb-10">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 pixel-font text-center">Participer à un challenge</h1>
            {/* Formulaire de participation */}
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6">
                <div className="flex flex-row gap-3">
                  <select defaultValue="Youtube" className="select">
                    <option>Youtube</option>
                    <option>Twitch</option>
                    <option>DailyMotion</option>
                    <option>Kick</option>
                  </select>
                  <input type="text" className="input w-full" placeholder="Lien vidéo" />                
                </div>                          
                <label htmlFor="proof" className="label">Description du challenge</label>
                <input name="proof" id="proof" type="text" className="input w-full" placeholder="Description du challenge" required/>
                <button type="submit" className="btn btn-primary mt-4 w-full">Participer</button>
              </fieldset>
            </form>

            <div className="container mx-auto px-4 py-8">
              {/* Affichage des erreurs */}
              {error && (
                <div className="alert alert-error mb-4">
                  <span>{error}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}