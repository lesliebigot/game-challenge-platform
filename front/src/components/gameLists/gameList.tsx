import "./gameList.css";
import {CardGame} from "../cardGame/cardGame.tsx";


export function GameList(){
  return(
    <>
      <div className="form-control  flex flex-row justify-between">
        <input type="text" placeholder="Rechercher..." className="input input-bordered w-30 md:w-50 lg:w-100" />
        <fieldset className="fieldset grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <select defaultValue="Pick a browser" className="select">
            <option disabled={false}>Tous</option>
            <option>Action</option>
            <option>Aventure</option>
            <option>RPG</option>
          </select>
        </fieldset>
      </div>
      <section className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12 mb-12">
          {Array.from({ length: 9}, (_, index) => (
            <CardGame key={index} />
          ))}
        </div>            
      </section>
    </>
  );
}