import "./cardGame.css";
import { useState } from "react";

export function CardGame(){
  const [isLike, setIsLike] = useState(false);

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
          <a href="/games/1">
            <button className="btn btn-primary">Voir les challenges</button>
          </a>
          {/*-- Bouton favoris --*/}
          <button 
            className="btn_star btn btn-sm sm:btn-md btn-circle btn-primary"
            onClick={() => setIsLike(!isLike)}
            title={isLike ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <i className={`${isLike ? "fa-solid text-yellow-300" : "fa-regular"} fa-star text-lg sm:text-xl`}></i>
          </button>
        </div>
      </div>
    </div> 
  );
};