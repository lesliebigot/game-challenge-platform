import "./homePage.css";

export function HomePage(){
  return (
    <main>
      {/* Hero Section */}
      <section className="hero min-h-[60vh] max-w-[80%] mt-20">
        <div className="hero-content text-center text-neutral-content">
          <div>
            <h1 className="mb-5 text-5xl font-bold pixel-font text-white">Relevez les défis</h1>
            <p className="mb-5 text-lg text-white">Rejoignez la communauté passionnée de gamers !</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">                  
              <div className="card bg-base-100 max-w-96 shadow-sm">
                <figure>
                  <img src="/images/bf6.webp" alt="Challenge"/>
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Speedrun Master</h2>
                  <p>Complétez le niveau 1 en moins de 2 minutes</p>
                  <div className="card-actions justify-between">
                    <div className="flex items-center gap-2">
                      <i className="fa fa-star text-warning"></i>
                      <span>500 votes</span>
                    </div>
                    <button className="btn btn-primary">Participer</button>
                  </div>
                </div>
              </div>  

              <div className="card bg-base-100 max-w-96 shadow-sm">
                <figure>
                  <img src="/images/bf6.webp" alt="Challenge"/>
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Speedrun Master</h2>
                  <p>Complétez le niveau 1 en moins de 2 minutes</p>
                  <div className="card-actions justify-between">
                    <div className="flex items-center gap-2">
                      <i className="fa fa-star text-warning"></i>
                      <span>500 votes</span>
                    </div>
                    <button className="btn btn-primary">Participer</button>
                  </div>
                </div>
              </div>  

              <div className="card bg-base-100 max-w-96 shadow-sm">
                <figure>
                  <img src="/images/bf6.webp" alt="Challenge"/>
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Speedrun Master</h2>
                  <p>Complétez le niveau 1 en moins de 2 minutes</p>
                  <div className="card-actions justify-between">
                    <div className="flex items-center gap-2">
                      <i className="fa fa-star text-warning"></i>
                      <span>500 votes</span>
                    </div>
                    <button className="btn btn-primary">Participer</button>
                  </div>
                </div>
              </div>  
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

      {/* Popular Games Section */}
      <section className="section max-w-[80%]">
        <div className="mt-4">
          <div className="form-control mb-12">
            <input type="text" placeholder="Rechercher..." className="input input-bordered w-20 md:w-auto" />
          </div>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold pixel-font mb-4">Jeux populaires</h2>
            <p className="text-lg text-base-content/70">Les jeux les plus joués de la communauté</p>
          </div>
            
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="game-card">
              <img src="/images/bf6.webp" alt="Jeu 1" className="w-full h-32 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"/>
              <div className="mt-2 text-center">
                <h3 className="font-semibold">Cyberpunk 2077</h3>
                <button className="btn btn-sm btn-ghost mt-1">
                  <i className="fa fa-star-o"></i>
                </button>
              </div>
            </div>
              
            <div className="game-card">
              <img src="/images/bf6.webp" alt="Jeu 2" className="w-full h-32 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"/>
              <div className="mt-2 text-center">
                <h3 className="font-semibold">The Witcher 3</h3>
                <button className="btn btn-sm btn-ghost mt-1">
                  <i className="fa fa-star"></i>
                </button>
              </div>
            </div>
              
            <div className="game-card">
              <img src="/images/bf6.webp" alt="Jeu 3" className="w-full h-32 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"/>
              <div className="mt-2 text-center">
                <h3 className="font-semibold">Elden Ring</h3>
                <button className="btn btn-sm btn-ghost mt-1">
                  <i className="fa fa-star-o"></i>
                </button>
              </div>
            </div>
              
            <div className="game-card">
              <img src="/images/bf6.webp" alt="Jeu 4" className="w-full h-32 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"/>
              <div className="mt-2 text-center">
                <h3 className="font-semibold">God of War</h3>
                <button className="btn btn-sm btn-ghost mt-1">
                  <i className="fa fa-star"></i>
                </button>
              </div>
            </div>
              
            <div className="game-card">
              <img src="/images/bf6.webp" alt="Jeu 5" className="w-full h-32 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"/>
              <div className="mt-2 text-center">
                <h3 className="font-semibold">Horizon Zero Dawn</h3>
                <button className="btn btn-sm btn-ghost mt-1">
                  <i className="fa fa-star-o"></i>
                </button>
              </div>
            </div>
              
            <div className="game-card">
              <img src="/images/bf6.webp" alt="Jeu 6" className="w-full h-32 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"/>
              <div className="mt-2 text-center">
                <h3 className="font-semibold">Spider-Man</h3>
                <button className="btn btn-sm btn-ghost mt-1">
                  <i className="fa fa-star"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}