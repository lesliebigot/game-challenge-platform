import "./gameList.css";
import {CardGame} from "../cardGame/cardGame.tsx";


export function GameList(){
  return(
    <section className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12 mb-12">
        {Array.from({ length: 9}, (_, index) => (
          <CardGame key={index} />
        ))}
      </div>            
    </section>
  );
}