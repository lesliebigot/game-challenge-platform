import "./cardGameLight.css";

export function CardGameLight(){
  return (
    <div className="game-card">
      <a href="/games/1">
        <img src="/images/bf6.webp" alt="Jeu 1" className="w-full h-32 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"/>
        <div className="mt-2 text-center">
          <h3 className="font-semibold">Cyberpunk 2077</h3>
          <button className="btn btn-sm btn-ghost mt-1">
            <i className="fa fa-star-o"></i>
          </button>
        </div>
      </a>
    </div>
  );
};