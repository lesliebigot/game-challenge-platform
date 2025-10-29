import "./cardGame.css";

import { useState } from "react";
import type { IGameDetails } from "../../../@types/game";

interface CardGameProps {
  game: IGameDetails;
}

export function CardGame({ game }: CardGameProps) {
  
  const [isLike, setIsLike] = useState(false);

  return (
    <div>
     
      <div key={game.id} className="card bg-base-100 max-w-96 min-h-full shadow-sm mb-4 ">
        <a href={`/games/${game.id}`}>
          <figure className="w-auto">
            <img src={game.image} alt={game.title}/>
          </figure>
        </a>
        <div className="card-body">
          <h2 className="card-title text-md">{game.title}</h2>
          <p>{game.description}</p>
          <div className="flex gap-2 justify-center">
            <a href={`/games/${game.id}`}>
              <button className="btn btn-primary">Voir le détail</button>
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
