import { useState } from "react";

interface Player {
  id: number;
  pseudo: string;
  likes: number;
  avatar?: string;
  level: number;
  videosCount?: number;
}

export function Ranking() {
  const [players] = useState<Player[]>([
    { id: 1, pseudo: "ProGamer2024", likes: 15420, level: 67, videosCount: 89 },
    { id: 2, pseudo: "ShadowHunter", likes: 14850, level: 63, videosCount: 76 },
    { id: 3, pseudo: "NinjaSpeed", likes: 13920, level: 59, videosCount: 92 },
    { id: 4, pseudo: "EliteGamer", likes: 12750, level: 55, videosCount: 64 },
    { id: 5, pseudo: "CyberWarrior", likes: 11980, level: 52, videosCount: 58 },
    { id: 6, pseudo: "PixelMaster", likes: 11220, level: 48, videosCount: 73 },
    { id: 7, pseudo: "CodeBreaker", likes: 10890, level: 45, videosCount: 45 },
    { id: 8, pseudo: "GameLegend", likes: 10340, level: 42, videosCount: 51 },
    { id: 9, pseudo: "TechNinja", likes: 9870, level: 39, videosCount: 38 },
    { id: 10, pseudo: "QuantumGamer", likes: 9120, level: 36, videosCount: 42 }
  ]);

  const formatLikes = (likes: number) => {
    if (likes >= 1000000) {
      return `${(likes / 1000000).toFixed(1)}M`;
    } else if (likes >= 1000) {
      return `${(likes / 1000).toFixed(1)}K`;
    }
    return likes.toLocaleString("fr-FR");
  };

  const getPodiumHeight = (position: number) => {
    switch(position) {
    case 1: return "h-32"; // 1er - le plus haut
    case 2: return "h-24"; // 2ème
    case 3: return "h-20"; // 3ème
    default: return "h-16";
    }
  };

  const getPodiumColor = (position: number) => {
    switch(position) {
    case 1: return "bg-gradient-to-t from-yellow-600 to-yellow-400";
    case 2: return "bg-gradient-to-t from-gray-500 to-gray-300";
    case 3: return "bg-gradient-to-t from-amber-600 to-amber-400";
    default: return "bg-base-300";
    }
  };

  const getMedal = (position: number) => {
    switch(position) {
    case 1: return "🥇";
    case 2: return "🥈";
    case 3: return "🥉";
    default: return `#${position}`;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Titre */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold pixel-font mb-2">👍 Classement</h1>
        <p className="text-lg text-base-content/70">Les participants les plus appréciés de la communauté</p>
      </div>

      {/* Podium */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-6">🏅 Top 3 des plus likés</h2>
        <div className="flex justify-center items-end gap-4 mb-8">
          
          {/* 2ème place */}
          <div className="flex flex-col items-center">
            <div className="mb-4 text-center">
              <div className="avatar">
                <div className="w-16 rounded-full ring ring-gray-400 ring-offset-base-100 ring-offset-2">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${players[1].pseudo}`} alt={players[1].pseudo} />
                </div>
              </div>
              <h3 className="font-bold text-sm mt-2">{players[1].pseudo}</h3>
              <p className="text-xs text-base-content/70">{players[1].videosCount} vidéos</p>
              <div className="flex items-center justify-center gap-1 text-sm font-semibold text-gray-400">
                <i className="fa-solid fa-thumbs-up text-xs"></i>
                <span>{formatLikes(players[1].likes)}</span>
              </div>
            </div>
            <div className={`${getPodiumColor(2)} ${getPodiumHeight(2)} w-24 rounded-t-lg flex items-start justify-center pt-2`}>
              <span className="text-2xl">🥈</span>
            </div>
          </div>

          {/* 1ère place */}
          <div className="flex flex-col items-center">
            <div className="mb-4 text-center">
              <div className="avatar">
                <div className="w-20 rounded-full ring ring-yellow-400 ring-offset-base-100 ring-offset-2">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${players[0].pseudo}`} alt={players[0].pseudo} />
                </div>
              </div>
              <h3 className="font-bold text-lg mt-2">{players[0].pseudo}</h3>
              <p className="text-sm text-base-content/70">{players[0].videosCount} vidéos</p>
              <div className="flex items-center justify-center gap-1 text-lg font-bold text-yellow-400">
                <i className="fa-solid fa-thumbs-up"></i>
                <span>{formatLikes(players[0].likes)}</span>
              </div>
            </div>
            <div className={`${getPodiumColor(1)} ${getPodiumHeight(1)} w-24 rounded-t-lg flex items-start justify-center pt-2`}>
              <span className="text-3xl">🥇</span>
            </div>
          </div>

          {/* 3ème place */}
          <div className="flex flex-col items-center">
            <div className="mb-4 text-center">
              <div className="avatar">
                <div className="w-16 rounded-full ring ring-amber-400 ring-offset-base-100 ring-offset-2">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${players[2].pseudo}`} alt={players[2].pseudo} />
                </div>
              </div>
              <h3 className="font-bold text-sm mt-2">{players[2].pseudo}</h3>
              <p className="text-xs text-base-content/70">{players[2].videosCount} vidéos</p>
              <div className="flex items-center justify-center gap-1 text-sm font-semibold text-amber-400">
                <i className="fa-solid fa-thumbs-up text-xs"></i>
                <span>{formatLikes(players[2].likes)}</span>
              </div>
            </div>
            <div className={`${getPodiumColor(3)} ${getPodiumHeight(3)} w-24 rounded-t-lg flex items-start justify-center pt-2`}>
              <span className="text-2xl">🥉</span>
            </div>
          </div>
        </div>
      </div>

      {/* Classement complet */}
      <div>
        <h2 className="text-2xl font-bold mb-4">📊 Classement complet</h2>
        <div className="bg-base-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="bg-base-300">
                  <th className="text-left">Rang</th>
                  <th className="text-left">Participant</th>
                  <th className="text-center">Vidéos</th>
                  <th className="text-center">👍 Likes</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr key={player.id} className={`hover:bg-base-100 ${index < 3 ? "bg-base-100/50" : ""}`}>
                    <td className="font-bold">
                      <span className="text-lg">{getMedal(index + 1)}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-10 rounded-full">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.pseudo}`} alt={player.pseudo} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{player.pseudo}</div>
                          <div className="text-sm opacity-50">Participant</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      <span className="badge badge-outline">{player.videosCount}</span>
                    </td>
                    <td className="text-center font-semibold">
                      <div className="flex items-center justify-center gap-1">
                        <i className="fa-solid fa-thumbs-up text-blue-500"></i>
                        <span>{formatLikes(player.likes)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}