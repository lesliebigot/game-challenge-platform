import "./header.css";
import useUserContext from "../../context/useUserContext";
import { useNavigate } from "react-router";


export function Header() {

  const navigate = useNavigate();

  const { pseudo, logout } = useUserContext();

  return (
    <header className="navbar bg-base-100 shadow-lg z-50 relative top-0 mb-1">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52">
            <li><a href="/">Accueil</a></li>
            <li><a href="/games">Liste des jeux</a></li>
            <li><a href="/challenges">Challenges</a></li>
            <li><a href="/ranking">Classements</a></li>
          </ul>
        </div>
        <div>
          <a href="/" className="flex items-center">
            <img src="/images/logo.png" alt="Gamer Challenges Logo" className="h-10 w-10 mr-3"/>
            <span className="text-xl font-bold pixel-font">Gamer Challenges</span>
          </a>
        </div>
      </div>
        
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a href="/" className="btn btn-ghost">Accueil</a></li>
          <li><a href="/games" className="btn btn-ghost">Liste des jeux</a></li>
          <li><a href="/challenges" className="btn btn-ghost">Challenges</a></li>
          <li><a href="/ranking" className="btn btn-ghost">Classements</a></li>
        </ul>
      </div>
        
      <div className="navbar-end">
        <div className="flex items-center gap-4">
          {pseudo ? (<p>Bonjour {pseudo}</p>) : ("")}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <i className="fa fa-user text-xl"></i>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52">
              {pseudo ? (<><li><a href="/profil">Profil</a></li>
                <li>
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault(); // Empêche la navigation immédiate
                      logout(); // Déconnecte l'utilisateur
                      navigate("/"); // Redirige vers l'accueil après la déconnexion
                    }}
                  >
                    Déconnexion
                  </a>
                </li></>) : (
                <><li><a href="/signin">Se connecter</a></li><li><a href="/signup">S'inscrire</a></li></>)              
              }
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}