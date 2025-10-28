import "./team.css";

export function Team(){
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-12 mb-12 mx-auto">
        <div className=" bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src="../images/surprise/Leslie.png"
              className="max-w-xs rounded-lg shadow-2xl"
            />
            <div>
              <p className="text-5xl font-bold">Leslie</p>
              <p className="py-6">
            Rôle : 
            Product Owner
              </p>
            </div>
          </div>
        </div>
      
        <div className=" bg-base-200 ">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src="../images/surprise/Olivier.png"
              className="max-w-xs rounded-lg shadow-2xl"
            />
            <div>
              <p className="text-5xl font-bold">Olivier</p>
              <p className="py-6">
            Rôle : 
            Scrum Master
              </p>
            </div>
          </div>
        </div>
      
        <div className=" bg-base-200 ">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src="../images/surprise/Virgile.png"
              className="max-w-xs rounded-lg shadow-2xl"
            />
            <div>
              <p className="text-5xl font-bold">Virgile</p>
              <p className="py-6">
            Rôle : 
            Dev Lead Front
              </p>
            </div>
          </div>
        </div>
      
        <div className=" bg-base-200 ">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src="../images/surprise/Alexis.png"
              className="surprise rounded-lg shadow-2xl"
            />
            <div>
              <p className="text-5xl font-bold">Alexis</p>
              <p className="py-6">
            Rôle : 
            Dev Lead Back
              </p>
            </div>
          </div>
        </div>
      
        <div className=" bg-base-200 ">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src="../images/surprise/Sammy.png"
              className="max-w-xs rounded-lg shadow-2xl"
            />
            <div>
              <p className="text-5xl font-bold">Sammy</p>
              <p className="py-6">
            Rôle : 
            Dev Lead Back
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
        
  );
}

