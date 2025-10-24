import { CardChallenge } from "../cardChallenge/cardChallenge.tsx";

export function CarouselWithCards() {
  return (
    <div className="carousel carousel-center bg-neutral rounded-box max-w-800 space-x-4 p-4 ">
      {/* Carousel */}
      <div className="carousel carousel-center bg-neutral rounded-box space-x-4 p-4 ">
        <div id="slide1" className="carousel-item ">
          <CardChallenge />
        </div>
        <div id="slide2" className="carousel-item ">
          <CardChallenge />
        </div>
        <div id="slide3" className="carousel-item ">
          <CardChallenge />
        </div>
        <div id="slide4" className="carousel-item ">
          <CardChallenge />
        </div>
        <div id="slide5" className="carousel-item ">
          <CardChallenge />
        </div>
        <div id="slide6" className="carousel-item ">
          <CardChallenge />
        </div>
      </div>

      <div className="absolute left-0 top-2/3 transform -translate-y-1/2">
        <a
          href="#slide1"
          className="btn btn-circle ml-2"
          onClick={(e) => {
            e.preventDefault(); // bloque rechargement + saut
            document.getElementById("slide1")?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
          }}
        >
    ❮
        </a>
      </div>
      <div className="absolute right-0 top-2/3 transform -translate-y-1/2"> 
        <a
          href="#slide6"
          className="btn btn-circle mr-2"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("slide6")?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
          }}
        >
    ❯
        </a>
      </div>
    </div>
  );
};

