import { useState } from "react";
import "./cardGame.css";
import type { IGameDetails } from "../../../@types/game";

interface CardGameProps {
  game: IGameDetails;
}

export function CardGame({ game }: CardGameProps) {
  
  const [isLike, setIsLike] = useState(false);

  return (
    <div>
     
      <div key={game.id} className="card bg-base-100 w-96 min-h-full shadow-sm mb-4">
        <figure>
          <img src={game.image} alt={game.title} className="w-sm"/>
        </figure>
        <div className="card-body">
          <h2 className="card-title text-md">{game.title}</h2>
          <p>{game.description}</p>
          <div className="flex gap-5">
            <a href={`/games/${game.id}`}>
              <button className="btn btn-primary">Voir les challenges</button>
            </a>
            <button
              className="btn_star btn btn-sm sm:btn-md btn-circle btn-primary"
              onClick={() => setIsLike(!isLike)}
              title={isLike ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              <i
                className={`${
                  isLike ? "fa-solid text-yellow-300" : "fa-regular"
                } fa-star text-lg sm:text-xl`}
              ></i>
            </button>
          </div>
          
        </div>
      </div>
      
    </div>
  );
}
