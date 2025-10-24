import "./editChallenge.css";

export function EditChallenge(){
  return (
    <> 
      <div>
        <div className="flex justify-center">
          <img src="/images/bf6.webp" alt="battlefield 6" className="img mt-5"/>    
        </div>
        <div className="flex items-center justify-center px-4 pt-10 pb-10">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 pixel-font text-center">Modifier un challenge</h1>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6">

              <label className="label">Titre du challenge</label>
              <input type="text" className="input w-full" placeholder="Titre du challenge" />

              <label className="label">Description du challenge</label>
              <input type="text" className="input w-full" placeholder="Description du challenge" />

              <button className="btn btn-primary mt-4 w-full">Valider</button>
            </fieldset>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="btn btn-warning mb-4">Supprimer le challenge</button>
        </div>
      </div>
    </>
  );
}