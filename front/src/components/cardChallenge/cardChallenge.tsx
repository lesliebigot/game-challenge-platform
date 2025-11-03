import "./cardChallenge.css";
import type { IChallenge } from "../../../@types/challenge.d.ts";

interface ChallengesProps {
  topChallenge: IChallenge;
}

interface ChallengesspecProps {
  challenge: IChallenge;
}

export function CardChallenge({topChallenge} : ChallengesProps) {
  // Vérification si topChallenge existe et a les propriétés nécessaires
  if (!topChallenge || !topChallenge.game) {
    return <div>Chargement...</div>;
  }
  
  return (
    <div className="card bg-base-100 max-w-96 shadow-sm">
      <figure>
        <img src={topChallenge.game.image} alt={topChallenge.game.title}/>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{topChallenge.title}</h2>
        <p>{topChallenge.description}</p>
        <div className="card-actions justify-between">
          <div className="flex items-center gap-2">
            <i className="fa fa-star text-warning"></i>
            <span>{topChallenge.likeCount} votes</span>
          </div>
          <a href="/participate-challenge"><button className="btn btn-primary">Participer</button></a>
        </div>
      </div>
    </div>
  );
}

export function CardChallengeSpecific({challenge}: ChallengesspecProps) {
  return (
    <div className="card bg-base-100 max-w-96 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{challenge.title}</h2>
        <p>{challenge.description}</p>
        <div className="card-actions justify-between">
          <div className="flex items-center gap-2">
            <i className="fa fa-star text-warning"></i>
            <span>500 votes</span>
          </div>
          <a href={`/participate-challenge/${challenge.id}`}><button className="btn btn-primary">Participer</button></a>
        </div>
      </div>
    </div>
  );
}

export function CardChallengeEdit() {
  return (
    <div className="card bg-base-100 max-w-96 shadow-sm">
      <figure>
        <img src="/images/bf6.webp" alt="Challenge"/>
      </figure>
      <div className="card-body">
        <h2 className="card-title">Speedrun Master</h2>
        <p>Complétez le niveau 1 en moins de 2 minutes</p>
        <div className="card-actions justify-between">
          <div className="flex items-center gap-2">
            <i className="fa fa-star text-warning"></i>
            <span>500 votes</span>
          </div>
          <div className="flex gap-2">
            <a href="/challenges/1"><button className="btn btn-primary">Voir</button></a>
            <a href="/edit-challenge"><button className="btn btn-primary">Editer</button></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ParticipatedChallenges() {
  return (
    <div className="card bg-base-100 max-w-96 shadow-sm">
      <figure>
        <img src="/images/bf6.webp" alt="Challenge"/>
      </figure>
      <div className="card-body">
        <h2 className="card-title">Speedrun Master</h2>
        <p>Complétez le niveau 1 en moins de 2 minutes</p>
        <div className="card-actions justify-between">
          <div className="flex items-center gap-2">
            <i className="fa fa-star text-warning"></i>
            <span>500 votes</span>
          </div>
          <a href="/challenges/1"><button className="btn btn-primary">Voir</button></a>
        </div>
      </div>
    </div>
  );
}

