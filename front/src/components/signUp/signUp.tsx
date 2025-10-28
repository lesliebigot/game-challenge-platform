{/* Inscription */}

export function SignUp(){
  return (
    <> 
      <div className="w-full max-w-4xl mx-auto px-4 pt-10 pb-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 pixel-font text-center">Page d'inscription</h1>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="label">Nom</label>
              <input type="text" className="input w-full" placeholder="Nom" />
            </div>

            <div>
              <label className="label">Prénom</label>
              <input type="text" className="input w-full" placeholder="Prénom" />
            </div>

            <div>
              <label className="label">Date de naissance</label>
              <input type="date" className="input w-full" placeholder="Date de naissance" />
            </div>
            
            <div>
              <label className="label">Email</label>
              <input type="email" className="input w-full" placeholder="Email" />
            </div>

            <div>
              <label className="label">Mot de passe</label>
              <input type="password" className="input w-full" placeholder="Mot de passe" />
            </div>

            <div>
              <label className="label">Confirmer le mot de passe</label>
              <input type="password" className="input w-full" placeholder="Confirmer le mot de passe" />
            </div>

            <div>
              <label className="label">Pseudo</label>
              <input type="text" className="input w-full" placeholder="Pseudo" />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button className="btn btn-primary">S'inscrire</button>
          </div>
        </fieldset>
      </div>
    </>
  );
}