import { CardChallenge } from "../cardChallenge/cardChallenge.tsx";
import type { IChallenge } from "../../../@types/challenge.d.ts";

interface ChallengesProps {
  topChallenge: IChallenge;
}

export function CarouselWithCards({topChallenge} : ChallengesProps) {
  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Carousel Container */}
      <div className="carousel carousel-center bg-neutral rounded-box w-full space-x-2 sm:space-x-4 p-2 sm:p-4 overflow-x-auto">
        {/* Slides */}
        <div id="slide1" className="carousel-item flex-none w-64 sm:w-72 md:w-80 lg:w-96">
          <CardChallenge topChallenge={topChallenge} />
        </div>
        <div id="slide2" className="carousel-item flex-none w-64 sm:w-72 md:w-80 lg:w-96">
          <CardChallenge topChallenge={topChallenge}/>
        </div>
        <div id="slide3" className="carousel-item flex-none w-64 sm:w-72 md:w-80 lg:w-96">
          <CardChallenge topChallenge={topChallenge} />
        </div>
        <div id="slide4" className="carousel-item flex-none w-64 sm:w-72 md:w-80 lg:w-96">
          <CardChallenge topChallenge={topChallenge} />
        </div>
        <div id="slide5" className="carousel-item flex-none w-64 sm:w-72 md:w-80 lg:w-96">
          <CardChallenge topChallenge={topChallenge} />
        </div>
        <div id="slide6" className="carousel-item flex-none w-64 sm:w-72 md:w-80 lg:w-96">
          <CardChallenge topChallenge={topChallenge} />
        </div>
      </div>

      {/* Boutons de navigation - Cachés sur mobile */}
      <div className="hidden sm:block absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
        <a
          href="#slide1"
          className="btn btn-circle btn-sm"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("slide1")?.scrollIntoView({ 
              behavior: "smooth", 
              block: "nearest", 
              inline: "start" 
            });
          }}
        >
          ❮
        </a>
      </div>
      
      <div className="hidden sm:block absolute right-2 top-1/2 transform -translate-y-1/2 z-10">
        <a
          href="#slide6"
          className="btn btn-circle btn-sm"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("slide6")?.scrollIntoView({ 
              behavior: "smooth", 
              block: "nearest", 
              inline: "start" 
            });
          }}
        >
          ❯
        </a>
      </div>

      {/* Indicateurs de pagination - Visibles sur mobile */}
      <div className="flex justify-center mt-4 space-x-2 sm:hidden">
        {[1, 2, 3, 4, 5, 6].map((slide) => (
          <button
            key={slide}
            className="w-2 h-2 rounded-full bg-base-content/30 hover:bg-base-content/60"
            onClick={() => {
              document.getElementById(`slide${slide}`)?.scrollIntoView({ 
                behavior: "smooth", 
                block: "nearest", 
                inline: "start" 
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};