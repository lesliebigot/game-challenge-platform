import "./footer.css";


export function Footer() {
  return (
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
  );
}