import "./cardChallenge.css";
import type { IChallenge } from "../../../@types/challenge.d.ts";
import type { Challenge, ParticipatedChallenge } from "../../../@types/user";

interface ChallengesProps {
  topChallenge: IChallenge;
}

interface ChallengesProps {
  topChallenges: IChallenge;
}

interface ChallengesspecProps {
  challenge: IChallenge;
}

interface CardChallengeEditProps {
  challenge: Challenge;
}

interface ParticipatedChallengesProps {
  challenge: ParticipatedChallenge;
}

export function CardChallenge({ topChallenge }: ChallengesProps) {
  // Vérification si topChallenge existe et a les propriétés nécessaires
  if (!topChallenge || !topChallenge.game) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="card bg-base-100 max-w-96 shadow-sm">
      <figure>
        <img src={topChallenge.game.image} alt={topChallenge.game.title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{topChallenge.title}</h2>
        <p>{topChallenge.description}</p>
        <div className="card-actions justify-between">
          <div className="flex items-center gap-2">
            <i className="fa fa-star text-warning"></i>
            <span>{topChallenge.likeCount} votes</span>
          </div>
          <a href={`/participate-challenge/${topChallenge.id}`}>
            <button className="btn btn-primary">Participer</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export function CardChallengeSpecific({ challenge }: ChallengesspecProps) {
  return (
    <div className="card bg-base-100 max-w-96 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{challenge.title}</h2>
        <p>{challenge.description}</p>
        <div className="card-actions justify-between">
          <a href={`/challenges/${challenge.id}`}>
            <button className="btn btn-primary">Voir</button>
          </a>
          <a href={`/participate-challenge/${challenge.id}`}>
            <button className="btn btn-primary">Participer</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export function CardChallengeEdit({ challenge }: CardChallengeEditProps) {
  return (
    <div className="card bg-base-100 max-w-96 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{challenge.title}</h2>
        <p>{challenge.description}</p>
        <div className="card-actions justify-between">
          <div className="flex gap-2">
            {/* Lien "Voir" dynamique */}
            <a href={`/challenges/${challenge.id}`}>
              <button className="btn btn-primary">Voir</button>
            </a>
            {/* Lien "Editer" dynamique */}
            <a href={`/edit-challenge/${challenge.id}`}>
              <button className="btn btn-primary">Editer</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ParticipatedChallenges({
  challenge,
}: ParticipatedChallengesProps) {
  return (
    <div className="card bg-base-100 max-w-96 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{challenge.title}</h2>
        <p>{challenge.description}</p>
        <div className="card-actions justify-between">
          {/* Lien "Voir" dynamique */}
          <a href={`/challenges/${challenge.id}`}>
            <button className="btn btn-primary">Voir</button>
          </a>
        </div>
      </div>
    </div>
  );
}
