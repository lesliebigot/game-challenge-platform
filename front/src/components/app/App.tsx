import "./App.css";

function App() {
  return (
    <>
      {/* header */}
      <header className="navbar bg-base-100 shadow-lg z-50 relative top-0">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex="0" className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a href="#">Accueil</a></li>
              <li><a href="#">Challenges</a></li>
              <li><a href="#">Jeux</a></li>
              <li><a href="#">Classements</a></li>
            </ul>
          </div>
          <div className="flex items-center">
            <img src="/images/logo.png" alt="Gamer Challenges Logo" className="h-10 w-10 mr-3"/>
            <span className="text-xl font-bold pixel-font">Gamer Challenges</span>
          </div>
        </div>
        
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a href="#" className="btn btn-ghost">Accueil</a></li>
            <li><a href="#" className="btn btn-ghost">Challenges</a></li>
            <li><a href="#" className="btn btn-ghost">Jeux</a></li>
            <li><a href="#" className="btn btn-ghost">Classements</a></li>
          </ul>
        </div>
        
        <div className="navbar-end">
          <div className="flex items-center gap-4">
            <div className="dropdown dropdown-end">
              <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
                <i className="fa fa-user text-xl"></i>
              </div>
              <ul tabIndex="0" className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a href="#">Profil</a></li>
                <li><a href="#">Paramètres</a></li>
                <li><a href="#">Déconnexion</a></li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      
      <main>
        {/* Hero Section */}
        <section className="hero min-h-[60vh] max-w-[80%] mt-10">
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

      {/* Footer */}
      <footer className="p-10 bg-base-300 text-base-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <nav className="grid grid-rows-1">
          <header className="footer-title">À propos</header>
          <a className="link link-hover">Notre équipe</a>
          <a className="link link-hover">Contact</a>
        </nav>
        <nav className="grid grid-rows-1">
          <header className="footer-title">Légal</header>
          <a className="link link-hover">Conditions d'utilisation</a>
          <a className="link link-hover">Politique de confidentialité</a>
          <a className="link link-hover">Politique des cookies</a>
        </nav>
        <form>
          <header className="footer-title">Newsletter</header>
          <fieldset className="form-control w-80">
            <label className="label">
              <span className="label-text">Entrez votre email</span>
            </label>
            <div className="join">
              <input type="text" placeholder="username@site.com" className="input input-bordered join-item" />
              <button className="btn btn-primary join-item">S'abonner</button>
            </div>
          </fieldset>
        </form>
        <p className="bg-base-300 text-base-content border-t border-base-content/10">Copyright © 2025 - Tous droits réservés par Gamer Challenges</p>
      </footer>
    </>
  );
}

export default App;
