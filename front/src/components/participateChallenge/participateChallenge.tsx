import axios from "axios";
import "./participateChallenge.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { IChallenge } from "../../../@types/challenge";

export function ParticipateChallenge(){
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [proof, setProof] = useState("");
  const [loading, setLoading] = useState(false);
  const [challenge, setChallenge] = useState<IChallenge | null>(null);
  const navigate = useNavigate();
  const [csrfToken, setCsrfToken] = useState("");
  const params = useParams();
  const { id : challengeId } = params;

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
        const { data } = await axios.get(`http://localhost:3000/challenges/${challengeId}`, {
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
  }, [challengeId]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      console.log("🚀 Envoi de la participation...");
      const { data } = await axios.post(
        `http://localhost:3000/challenges/${challengeId}/participate`,
        { proof },
        {
          withCredentials: true,  // Important pour envoyer cookie HttpOnly
          headers: {
            "X-CSRF-Token": csrfToken
          },             
        }
      );
      setSuccess(data.message);
      // Rediriger après 2 secondes vers la page du jeu
      setTimeout(() => {
        navigate(`/games/${challenge?.game_id}`);
      }, 2000);
      setProof("");
    } catch (e) {
      console.error("Erreur API :", e);
      // Gestion d'erreur plus précise
      if (axios.isAxiosError(e)) {

        console.log("📋 Détails de l'erreur:", e.response?.data);

        if (e.response?.status === 403) {
          setError("Erreur de sécurité (CSRF). Veuillez recharger la page.");
        } else if (e.response?.status === 401) {
          setError("Vous devez être connecté pour participer.");
          setTimeout(() => navigate("/signin"), 2000);
        } else if (e.response?.status === 400 && e.response?.data?.errors) {
          // Gestion des erreurs de validation Zod
          const errors = e.response.data.errors;
          const errorMessages: string[] = [];
          
          // Parcourir tous les champs en erreur
          for (const field in errors) {
            const fieldErrors = errors[field];
            if (Array.isArray(fieldErrors)) {
              errorMessages.push(...fieldErrors);
            }
          }
          
          // Affiche toutes les erreurs de validation
          setError(errorMessages.join(". "));
        } else {
          // Pour les autres types d'erreur
          const errorMessage = 
            e.response?.data?.error || 
            e.response?.data?.message || 
            "Erreur lors de la participation au challenge";
          
          setError(errorMessage);
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
    <div>
      <div className="flex justify-center">
        <img src={challenge?.game?.image} alt={challenge?.game?.title} className="img mt-5"/>    
      </div>
      <h1 className="text-3xl font-bold mb-6 pt-8 pixel-font text-center">Participer au challenge</h1>      
      
      <div className="flex items-center justify-center px-4 pt-5 pb-10">
        <div className="w-full max-w-lg">
          
          
          {/* Informations du challenge */}
          {challenge && (
            <div className="mb-4 pb-4 bg-base-200 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">{challenge.title}</h2>
              <p>{challenge.description}</p>
            </div>
          )}
          {/* Affichage des erreurs */}
          {error && (
            <div className="alert alert-error mb-4 mx-4">
              <span>{error}</span>
            </div>
          )}
          {/* Affichage du message de succès */}
          {success && (
            <div className="alert alert-success mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{success}</span>
            </div>
          )}         
          {/* Formulaire de participation */}
          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6">
              <span className="label-text">Lien de votre vidéo de participation ici</span>
              <div className="flex flex-row gap-3">
                <select defaultValue="Youtube" className="select">
                  <option>Youtube</option>
                  <option>Twitch</option>
                  <option>DailyMotion</option>
                  <option>Kick</option>
                </select>
                <input
                  id="proof"
                  name="proof"
                  type="url"
                  className="input w-full"
                  placeholder="https://example.com/ma-preuve.png"
                  value={proof}
                  onChange={(e) => setProof(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary mt-4 w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Envoi en cours...
                  </>
                ) : (
                  "Participer"
                )}
              </button>
            </fieldset>
          </form>
          
        </div>
      </div>
    </div>
  );
}