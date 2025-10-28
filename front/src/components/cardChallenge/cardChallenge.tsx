import "./cardChallenge.css";


export function CardChallenge() {
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
          <a href="/participate-challenge"><button className="btn btn-primary">Participer</button></a>
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

