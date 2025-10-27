import "./specificGame.css";
import {CardChallenge} from "../cardChallenge/cardChallenge.tsx";
import {useState} from "react";

export function SpecificGame(){

  const [isLike, setIsLike] = useState(false);

  return (
    <>
      {/* Section image du jeu */}
      <section className="section-game w-[80%]">
        <img src="../images/bf6.webp" alt="image du jeu" className="img_game"/>
      </section>
      {/* Section information et détails jeux */}          
      <section className="section-game max-w-[80%]">
        {/* Info spé jeux */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-0">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold pixel-font text-white mb-2">Battlefield 6
            </h1>
            <p className="text-base lg:text-lg text-white">Année : 2025</p>  
          </div>
          <div className="flex-1 lg:text-right">
            <p className="text-base lg:text-lg text-white">Plateforme : PC, Xbox et Playstation</p> 
            <p className="text-base lg:text-lg text-white">Editeur : EA</p>   
          </div>            
        </div>
        {/* Description jeu */}
        <div className="flex flex-col lg:flex-row lg:justify-between mt-5 gap-4">
          <div className="flex-1 lg:pr-8">
            <p className="text-base lg:text-lg text-white mb-3">Description :</p>
            <p className="text-sm lg:text-base text-white leading-relaxed">
        Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, 
        or even a very very short story. Body text for whatever you'd like to say. Add main 
        takeaway points, quotes, anecdotes, or even a very very short story. Body text for 
        whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a 
        very very short story. Body text for whatever you'd like to say. Add main takeaway 
        points, quotes, anecdotes, or even a very very short story.
            </p>
          </div>
    
          {/* Btn selection */}
          <div className="flex flex-row justify-center lg:justify-end items-start gap-3 lg:gap-4 flex-shrink-0">
            <button 
              className={`btn_star btn btn-sm sm:btn-md btn-circle transition-colors ${
                isLike ? "btn-warning" : "btn-primary"
              }`}
              onClick={() => setIsLike(!isLike)}
              title={isLike ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              <i className={`${isLike ? "fa-solid" : "fa-regular"} fa-star text-lg sm:text-xl ${
                isLike ? "text-yellow-300" : ""
              }`}></i>
            </button>
            <button className="btn btn-primary btn-sm sm:btn-md whitespace-nowrap">
        Créer un challenge
            </button>
          </div>            
        </div>
      </section>

      
      {/* Challenges dispo */}
      <section className="section-challenges max-w-full"> 
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 justify-between gap-6">
          {Array.from({ length: 3 }, (_, index) => (
            <CardChallenge key={index} />
          ))}
        </div> 
        
      </section>
      
    </>
  );
}