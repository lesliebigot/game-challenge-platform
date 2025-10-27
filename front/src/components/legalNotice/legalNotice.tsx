{/* Mentions légales */}

export function LegalNotice(){
  return (
    <>
      <div className="w-full max-w-4xl mx-auto px-4 pt-10 pb-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 pixel-font text-center">Mentions légales</h1>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <h2 className="text-xl font-bold">1. Informations légales</h2>
              <p>Nom de l'entreprise : Votre Entreprise</p>
              <p>Adresse : 123 Rue Exemple, 75000 Paris, France</p>
              <p>SIRET : 123 456 789 00010</p>
            </div>

            <div>
              <h2 className="text-xl font-bold">2. Propriété intellectuelle</h2>
              <p>Tous les contenus présents sur ce site, y compris les textes, images, graphismes, logos, vidéos, etc., sont protégés par le droit d'auteur et sont la propriété exclusive de Votre Entreprise.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold">3. Données personnelles</h2>
              <p>Nous collectons et traitons vos données personnelles conformément à notre politique de confidentialité.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold">4. Contact</h2>
              <p>Pour toute question concernant les mentions légales, veuillez nous contacter à l'adresse suivante : contact@votreentreprise.com</p>
            </div>
          </div>
        </fieldset>
      </div>
    </>
  );
}