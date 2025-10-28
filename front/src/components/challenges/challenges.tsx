import {CardChallengeEdit, ParticipatedChallenges} from "../cardChallenge/cardChallenge.tsx";

export function Challenges() {
  return (
    <div className="p-8 text-center space-y-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 pixel-font">Challenges</h1>
      <h2 className="text-2xl font bold pixel-font">Mes créations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 3 }, (_, index) => (
          <CardChallengeEdit key={index} />
        ))}
      </div>   
      <h2 className="text-2xl font bold pixel-font">Mes participations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 3 }, (_, index) => (
          <ParticipatedChallenges key={index} />
        ))}
      </div>    
    </div>
  );
}