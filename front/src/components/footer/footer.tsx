import "./footer.css";


export function Footer() {
  return (
    <>
      <footer className="p-10 bg-base-300 text-base-content flex flex-wrap gap-8 justify-between"> 
        <nav className="flex flex-col">
          <header className="footer-title">À propos</header>
          <a className="link link-hover">Notre équipe</a>
          <a className="link link-hover">Contact</a>
        </nav>
        <nav className="flex flex-col">
          <header className="footer-title">Légal</header>
          <a className="link link-hover">Conditions d'utilisation</a>
          <a className="link link-hover">Politique de confidentialité</a>
          <a className="link link-hover">Politique des cookies</a>
        </nav>
        <form className="flex flex-col">
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
      </footer>
      <footer className="p-4 bg-base-300 text-base-content border-t border-base-content/10 justify-center text-center">
        <p>Copyright © 2025 - Tous droits réservés par Gamer Challenges</p>
      </footer>
    </>
  );
}