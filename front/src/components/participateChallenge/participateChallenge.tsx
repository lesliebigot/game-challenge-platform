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
        "http://localhost:3000/challenges/1/participate",
        { proof },
        {
          withCredentials: true,  // Important pour envoyer cookie HttpOnly
          headers: {
            "X-CSRF-Token": csrfToken
          },             
        }
      );
      console.log(data.message);
      navigate("/games/1");
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
    <div className="container mx-auto px-4 py-8">
      {/* Affichage des erreurs */}
      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {/* Informations du challenge */}
      {challenge && (
        <div className="card bg-base-200 shadow-xl mb-6">
          <div className="card-body">
            <h2 className="card-title text-2xl">{challenge.title}</h2>
            <p>{challenge.description}</p>
            {/* Ajoute d'autres informations du challenge si nécessaire */}
          </div>
        </div>
      )}

      {/* Formulaire de participation */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">Participer au challenge</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label" htmlFor="proof">
                <span className="label-text">Preuve de participation</span>
              </label>
              {/* input type="url" */}
              <input
                id="proof"
                type="url"
                className="input input-bordered w-full"
                placeholder="https://example.com/ma-preuve.png"
                value={proof}
                onChange={(e) => setProof(e.target.value)}
                required
                disabled={loading}
                pattern="https://.*" // Force le https://
              />
              <label className="label">
                <span className="label-text-alt text-info">
                  💡 Uploadez votre preuve sur imgur.com, imgbb.com ou un service similaire
                </span>
              </label>
            </div>

            <div className="card-actions justify-end mt-4">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading || !csrfToken}
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}