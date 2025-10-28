import "./specificChallenge.css";
import {useState} from "react";
import { CardVideo } from "../cardVideo/cardVideo";


export function SpecificChallenge(){

  const [isLike, setIsLike] = useState(false);

  return (
    <>
      {/* Section image du jeu */}
      <section className="section-game w-[80%]">
        <img src="../images/bf6.webp" alt="image du jeu" className="img_game"/>
      </section>
      {/* Section information et détails challenge */}          
      <section className="section-game max-w-[80%]">
        {/* Info spé jeux */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-0">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold pixel-font text-white mb-2">Titre du challenge
            </h1>  
          </div>
          <div className="flex-1 lg:text-right">
            <p className="text-base lg:text-lg text-white">Jeu : Battlefield 6</p>   
            <p className="text-base lg:text-lg text-white">Plateforme : PC, Xbox et Playstation</p>   
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
          <div className="flex flex-row justify-center lg:justify-end items-start gap-3 lg:gap-4 shrink-0">
            <button 
              className="btn_star btn btn-sm sm:btn-md btn-circle btn-primary"
              onClick={() => setIsLike(!isLike)}
              title={isLike ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              <i className={`${isLike ? "fa-solid text-blue-900" : "fa-regular"} fa-thumbs-up text-lg sm:text-xl`}></i>
            </button>
            
            <a href="/participate-challenge"><button className="btn btn-primary btn-sm sm:btn-md whitespace-nowrap">Participer au challenge</button></a>
            
          </div>            
        </div>
      </section>

      
      {/* Challenges dispo */}
      <section className="section-challenges max-w-full"> 
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 justify-between gap-6">
          {Array.from({ length: 2 }, (_, index) => (
            <CardVideo key={index} />
          ))}
          <CardVideo platform="twitch" challengerPseudo="GamerPro456" publishedAt="il y a 6 jours"/>
        </div> 
        
      </section>
      
    </>
  );
}