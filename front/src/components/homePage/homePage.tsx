import "./homePage.css";

import {CardGameLight} from "../cardGame/cardGameLight.tsx";
import {CardChallenge} from "../cardChallenge/cardChallenge.tsx";
import {CarouselWithCards} from "../util/carrousel.tsx";


export function HomePage(){
  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="hero min-h-[60vh] max-w-[80%]">
          <div className="hero-content text-center text-neutral-content">
            <div>
              <h1 className="mb-5 text-5xl font-bold pixel-font text-white">Relevez les défis</h1>
              <p className="mb-5 text-lg text-white">Rejoignez la communauté passionnée de gamers !</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }, (_, index) => (
                  <CardChallenge key={index} />
                ))}
              </div>                
            </div>        
          </div>
        </section>

        {/* Stats Section */}
        <section className="section max-w-[80%]">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="stat bg-base-200 shadow-lg rounded-lg">
                <div className="stat-figure text-primary">
                  <i className="fas fa-trophy text-3xl"></i>
                </div>
                <div className="stat-title">Challenges actifs</div>
                <div className="stat-value text-primary">1,254</div>
                <div className="stat-desc">En cours actuellement</div>
              </div>
              
              <div className="stat bg-base-200 shadow-lg rounded-lg">
                <div className="stat-figure text-secondary">
                  <i className="fas fa-gamepad text-3xl"></i>
                </div>
                <div className="stat-title">Jeux disponibles</div>
                <div className="stat-value text-secondary">87</div>
                <div className="stat-desc">Différents jeux supportés</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section flex flex-col items-center max-w-[80%]">
          {/* search tool */}
          <div className="form-control mb-12 flex flex-row justify-center gap-2">
            <input type="text" placeholder="Rechercher..." className="input input-primary input-bordered w-50 md:w-100 lg:w-200" />
            <button className="btn btn-primary"><svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
            </svg></button>
          </div>
          
          {/* Challenges Carousel Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold pixel-font mb-4">Les challenges du moment</h2>
          </div>
          
          <CarouselWithCards/>
        </section>

        {/* Popular Games Section */}
        <section className="section max-w-[80%]">
          <div className="mt-4">
            
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold pixel-font mb-4">Jeux populaires</h2>
              <p className="text-lg text-base-content/70">Les jeux les plus joués de la communauté</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }, (_, index) => (
                <CardGameLight key={index} />
              ))}
            </div>
            <div className="flex justify-center mb-5">
              <a href="/games">
                <button className="btn btn-primary">Voir plus</button>
              </a>
            </div>
            
          </div>
        </section>

      </main>
    </>
  );
}