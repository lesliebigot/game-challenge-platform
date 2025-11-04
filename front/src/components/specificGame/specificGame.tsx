import "./specificGame.css";
import { CardChallengeSpecific } from "../cardChallenge/cardChallenge.tsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import type { IGameDetails } from "../../../@types/game.d.ts";

export function SpecificGame() {
  const [games, setGames] = useState<IGameDetails | null>(null);
  const [isLike, setIsLike] = useState(false);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          `https://projet-gamer-challenges.onrender.com/games/${id}`
        );
        console.log("Données API reçues:", response.data);
        setGames(response.data);
      } catch (e: unknown) {
        console.error("Erreur API axios:", e instanceof Error ? e.message : e);
      }
    };
    fetchGames();
  }, [id]);

  return (
    <>
      {/* Section image du jeu */}
      <section className="section-game w-[80%]">
        <img src={games?.image} alt={games?.title} className="img_game" />
      </section>
      {/* Section information et détails jeux */}
      <section className="section-game max-w-[80%]">
        {/* Info spé jeux */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-0">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold pixel-font text-white mb-2">
              {games?.title}
            </h1>
            <p className="text-base lg:text-lg text-white">
              Genre : {games?.Genre?.name}
            </p>
          </div>
          <div className="flex-1 lg:text-right">
            <p className="text-base lg:text-lg text-white">
              Plateforme :{" "}
              {games?.platforms?.map((platform) => platform.name).join(", ")}{" "}
            </p>
            <p className="text-base lg:text-lg text-white">
              Editeur : {games?.editor?.name}
            </p>
          </div>
        </div>
        {/* Description jeu */}
        <div className="flex flex-col lg:flex-row lg:justify-between mt-5 gap-4">
          <div className="flex-1 lg:pr-8">
            <p className="text-base lg:text-lg text-white mb-3">
              Description :
            </p>
            <p className="text-sm lg:text-base text-white leading-relaxed">
              {games?.description}
            </p>
          </div>

          {/* Btn selection */}
          <div className="flex flex-row justify-center lg:justify-end items-start gap-3 lg:gap-4 shrink-0">
            <button
              className="btn_star btn btn-sm sm:btn-md btn-circle btn-primary"
              onClick={() => setIsLike(!isLike)}
              title={isLike ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              <i
                className={`${
                  isLike ? "fa-solid text-yellow-300" : "fa-regular"
                } fa-star text-lg sm:text-xl`}
              ></i>
            </button>
            <a href={`/create-challenge/0${games?.id}`}>
              <button className="btn btn-primary btn-sm sm:btn-md whitespace-nowrap">
                Créer un challenge
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Challenges dispo */}
      <section className="section-challenges max-w-full">
        <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
          {games?.challenges?.length ? (
            games.challenges.map((challenge, index) => (
              <CardChallengeSpecific key={index} challenge={challenge} />
            ))
          ) : (
            <p className="text-center text-white">
              Aucun challenge disponible pour ce jeu.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
