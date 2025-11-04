import { CardChallenge } from "../cardChallenge/cardChallenge.tsx";
import { useState, useEffect } from "react";
import axios from "axios";
import type { IChallenge } from "../../../@types/challenge.d.ts";

export function CarouselWithCards() {
  const [recentChallenges, setRecentChallenges] = useState<IChallenge[]>([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const { data } = await axios.get(
          "https://projet-gamer-challenges.onrender.com/challenges/recent"
        );
        // console.log("Données API reçues:", data.recentChallenges);
        setRecentChallenges(data.recentChallenges);
      } catch (e: unknown) {
        console.error("Erreur API axios:", e instanceof Error ? e.message : e);
      }
    };
    fetchChallenges();
  }, []);

  if (recentChallenges.length === 0) {
    return <div>Loading ...</div>;
  }
  const visibleChallenges = recentChallenges.slice(0, 6);

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Carousel Container */}
      <div className="carousel carousel-center bg-neutral rounded-box w-full space-x-4 p-4 overflow-x-auto">
        {visibleChallenges.map((topChallenge) => (
          <div
            key={topChallenge.id}
            className="carousel-item flex-none w-64 sm:w-72 md:w-80 lg:w-96"
          >
            <CardChallenge topChallenge={topChallenge} />
          </div>
        ))}
      </div>

      {/* Boutons de navigation */}
      <div className="hidden sm:block absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
        <button
          className="btn btn-circle btn-sm"
          onClick={() =>
            document
              .querySelector(".carousel")
              ?.scrollBy({ left: -300, behavior: "smooth" })
          }
        >
          ❮
        </button>
      </div>

      <div className="hidden sm:block absolute right-2 top-1/2 transform -translate-y-1/2 z-10">
        <button
          className="btn btn-circle btn-sm"
          onClick={() =>
            document
              .querySelector(".carousel")
              ?.scrollBy({ left: 300, behavior: "smooth" })
          }
        >
          ❯
        </button>
      </div>

      {/* Indicateurs de pagination (mobile) */}
      <div className="flex justify-center mt-4 space-x-2 sm:hidden">
        {visibleChallenges.map((_, i) => (
          <button
            key={i}
            className="w-2 h-2 rounded-full bg-base-content/30 hover:bg-base-content/60"
            onClick={() => {
              document
                .querySelector(".carousel")
                ?.scrollTo({ left: i * 300, behavior: "smooth" });
            }}
          />
        ))}
      </div>
    </div>
  );
}
