import "./cardGameLight.css";
import type { CardGameLightProps } from "../../../@types/game.d.ts";


export function CardGameLight({ game }: CardGameLightProps) {
  // Valeurs par défaut si aucun jeu n'est fourni
  const defaultGame = {
    id: 1,
    title: "Oups... Error",
    image: "/images/deadpool.gif"
  };

  const gameData = game || defaultGame;

  return (
    <div className="game-card">
      <a href={`/games/${gameData.id}`}>
        <img 
          src={gameData.image || "/images/deadpool.gif"} 
          alt={gameData.title} 
          className="w-full h-32 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        />
        <div className="mt-2 text-center">
          <h3 className="font-semibold">{gameData.title}</h3>
          <button className="btn btn-sm btn-ghost mt-1">
            <i className="fa fa-star-o"></i>
          </button>
        </div>
      </a>
    </div>
  );
}