{/* connexion */}

export function SignIn(){
  return(
    <> 
      <div className="flex items-center justify-center px-4 pt-10 pb-10">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 pixel-font text-center">Page de connexion</h1>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6">

            <label className="label">Email</label>
            <input type="email" className="input w-full" placeholder="Email" />

            <label className="label">Password</label>
            <input type="password" className="input w-full" placeholder="Password" />

            <button className="btn btn-primary mt-4 w-full">Se connecter</button>
          </fieldset>
        </div>
      </div>
    </>
  );
}   