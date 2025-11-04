import axios from "axios";
import { useEffect, useState } from "react";
import {
  CardChallengeEdit,
  ParticipatedChallenges,
} from "../cardChallenge/cardChallenge.tsx";
import { useParams } from "react-router";
import type { IUser } from "../../../@types/user";

export function Challenges() {
  // 1. L'état doit être un seul utilisateur (ou null), pas un tableau.
  const [user, setUser] = useState<IUser | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/users/${id}`);
        setUser(data); // data est un objet User, pas un User[]
      } catch (e: any) {
        console.error("Erreur API axios:", e.response || e.message || e);
      }
    };
    fetchUser();
  }, [id]);

  // 2. Gérer l'état de chargement
  if (!user) {
    return <div className="p-8 text-center">Chargement...</div>;
  }

  // 3. Le JSX est maintenant dynamique
  return (
    <div className="p-8 text-center space-y-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 pixel-font">Challenges</h1>

      <h2 className="text-2xl font bold pixel-font">Mes créations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* 4. Mapper sur les données réelles de user.createdChallenges */}
        {user.createdChallenges.map((challenge) => (
          <CardChallengeEdit key={challenge.id} challenge={challenge} />
        ))}
      </div>

      <h2 className="text-2xl font bold pixel-font">Mes participations</h2>
      {/* 5. Le map doit être À L'INTÉRIEUR de la div grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* 6. Mapper sur les données réelles de user.participatedChallenges */}
        {user.participatedChallenges.map((pChallenge) => (
          <ParticipatedChallenges key={pChallenge.id} challenge={pChallenge} />
        ))}
      </div>
    </div>
  );
}
