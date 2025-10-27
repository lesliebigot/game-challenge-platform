import "./participateChallenge.css";

export function ParticipateChallenge(){
  return (
    <> 
      <div>
        <div className="flex justify-center">
          <img src="/images/bf6.webp" alt="battlefield 6" className="img mt-5"/>    
        </div>
        <div className="flex items-center justify-center px-4 pt-10 pb-10">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 pixel-font text-center">Participer à un challenge</h1>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6">

              <div className="flex flex-row gap-3">
                <select defaultValue="Youtube" className="select">
                  <option>Youtube</option>
                  <option>Twitch</option>
                  <option>DailyMotion</option>
                  <option>Kick</option>
                </select>
                <input type="text" className="input w-full" placeholder="Lien vidéo" />
                
                
              </div>
             

              <label className="label">Description du challenge</label>
              <input type="text" className="input w-full" placeholder="Description du challenge" />

              <button className="btn btn-primary mt-4 w-full">Participer</button>
            </fieldset>
          </div>
        </div>
      </div>
    </>
  );
}