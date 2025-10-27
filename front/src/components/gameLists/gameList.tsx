import "./gameList.css";
import {CardGame} from "../cardGame/cardGame.tsx";


export function GameList(){
  return(
    <>
      <div className="flex flex-row justify-center mt-5 gap-10">
        <div className="flex gap-2">
          <label className="input input-primary ">
            
            <input type="search" required placeholder="Rechercher" />
          </label>
          <button className="btn btn-primary">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
          </button>
        </div>
        <fieldset className="fieldset  fieldset-secondary">
          <select defaultValue="Pick a browser" className="select select-primary">
            <option disabled={false}>Genre</option>
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