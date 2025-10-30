export function Profil(){
  return (
    <>
      <div className="h-full">
        <h1 className="text-3xl font-bold mb-6 pixel-font text-center mt-5">Mon profil</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 m-10">

          {/* Formulaire de modification de l'email */}
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 text-center max-w-96">
            <legend className="fieldset-legend">Email</legend>

            <label id="oldEmail" className="label">Ancien email</label>
            <input id="oldEmail" type="email" className="input" placeholder="Ancien email" />
            

            <label id="newEmail" className="label">Nouveau email</label>
            <input id="newEmail" type="email" className="input" placeholder="Nouveau email" />
            

            <button className="btn btn-neutral mt-4">Modifier</button>
          </fieldset> 

          {/* Formulaire de modification du mot de passe */}
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4 text-center max-w-96">
            <legend className="fieldset-legend">Mot de passe</legend>

            <label id="oldPassword" className="label">Ancien mot de passe</label>
            <input id="oldPassword" type="password" className="input" placeholder="Ancien mot de passe" />

            <label id="newPassword" className="label">Nouveau mot de passe</label>
            <input id="newPassword" type="password" className="input" placeholder="Nouveau mot de passe" />

            <button className="btn btn-neutral mt-4">Modifier</button>
          </fieldset>

          {/* Formulaire changement pseudo */}     
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4 text-center max-w-96">
            <legend className="fieldset-legend">Pseudo</legend>

            <label id="oldPseudo" className="label">Ancien pseudo</label>
            <input id="oldPseudo" type="text" className="input" placeholder="Ancien pseudo" />

            <label id="newPseudo" className="label">Nouveau pseudo</label>
            <input id="newPseudo" type="text" className="input" placeholder="Nouveau pseudo" />

            <button className="btn btn-neutral mt-4">Modifier</button>
          </fieldset>
          
          {/* Formulaire de suppression du compte */}
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4 text-center max-w-96">
            <legend className="fieldset-legend">Supprimer le compte</legend>

            <label id="password" className="label">Mot de passe</label>
            <input id="password" type="password" className="input" placeholder="Mot de passe" />

            <button className="btn btn-error mt-4">Supprimer mon compte</button>
          </fieldset>
        </div>
      </div>
    </>
  );
}
