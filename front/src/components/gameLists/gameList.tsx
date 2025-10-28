import "./gameList.css";
import {CardGame} from "../cardGame/cardGame.tsx";
import { useState, useEffect } from "react";
import axios from "axios";
import type { IGameDetails } from "../../../@types/game.d.ts";



export function GameList(){
  const [games, setGames] = useState<IGameDetails[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState("");
  
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/games");
        console.log("Données API reçues:", data);
        setGames(data);
      } catch (e: any) {
        console.error("Erreur API axios:", e.response || e.message || e);
      }
    };
    fetchGames();
  }, []);

  // Si tableau vide alors on affiche loading
  if (games.length === 0) {
    return <div>Loading ...</div>;
  }

  // Extrait seulement les genres non nuls
  const uniqueGenres = Array.from(
    new Map(
      games
        .filter(game => game.Genre !== null)  // filtre les jeux dont Genre est null
        .map(game => [game.Genre.id, game.Genre])
    ).values()
  );

  // Filtre les jeux en fonction du genre sélectionné
  const filteredGames = selectedGenre
    ? games.filter(game => game.Genre?.id === selectedGenre)
    : games;

  // Filtre jeux par barre recherche 
  const searchedGames = filteredGames.filter((game) => {
    return game.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  return(
    <>
      <div className="flex flex-row justify-center mt-5 gap-5">
        <div className="flex gap-2">
          <label className="input input-primary ">
            <input type="search" 
              value={searchValue}
              onChange={(changeEvent) => {
                const userSaisie = changeEvent.currentTarget.value;
                setSearchValue(userSaisie);
              } }required placeholder="Rechercher" 
            />
          </label>
        </div>
        <fieldset className="fieldset fieldset-secondary">
          <select 
            value={selectedGenre ?? ""}
            defaultValue="Genre" 
            className="select select-primary" 
            onChange={(e) => {
              const value = e.target.value;
              setSelectedGenre(value ? Number(e.target.value): null);}}>
            <option value="">Tous</option>
            {uniqueGenres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </fieldset> 

      </div>
      <section className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-12 mb-12">
          {searchedGames.map((game)=>(
            <CardGame key={game.id} game={game}/>
          ))}
        </div>            
      </section>
    </>
  );
}