import "./cardGame.css";

export function CardGame(){
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src="../../images/bf6.webp" alt="Battlefield 6"/>
      </figure>
      <div className="card-body">
        <h2 className="card-title text-center">Battlefield 6</h2>
        <p className="mb-5 mt-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="card-actions justify-between">
          <button className="btn btn-primary">Voir les challenges</button>
          <button className="btn btn-sm btn-ghost ">
            <i className="fa-regular fa-star text-xl"></i>
          </button>
        </div>
      </div>
    </div> 
  );
};