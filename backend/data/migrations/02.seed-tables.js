import { sequelize, Game, User, Role, Challenge, Genre, Platform, Editor, Participate  } from "../models/index.js";

const editors = [
  { name: "Rockstar Games" },
  { name: "Arcane Kids" },
  { name: "Take-Two Interactive" },
  { name: "System 3 Software" },
  { name: "Konami" },
  { name: "Annapurna Interactive" },
  { name: "St. GIGA" },
  { name: "Tec Toy" },
  { name: "Mediamond" },
  { name: "Agafonoff" },
  { name: "Warner Bros. Interactive Entertainment" },
  { name: "2K Sports" },
  { name: "CyberConnect2" },
  { name: "Team Undertale Yellow" },
  { name: "Global Star Software" },
  { name: "Square" },
  { name: "Joel G" },
  { name: "Echo Project" },
  { name: "Infogrames" },
  { name: "CD Projekt" },
  { name: "Buena Vista Games" },
  { name: "CD Projekt RED" },
  { name: "Gelato Games" },
  { name: "Komodo" },
  { name: "Beyond Frames Entertainment" },
  { name: "Bethesda Softworks" },
  { name: "Fellow Traveller" },
  { name: "Sony Computer Entertainment" },
  { name: "HOBIBOX" },
  { name: "Bandai Namco Entertainment" },
  { name: "Bombergames" },
  { name: "Wise Wizard Games" },
  { name: "Electronic Arts" },
  { name: "Bergice Productions" },
  { name: "Ocean Software" },
  { name: "United Soft Media Verlag GmbH" },
  { name: "Nintendo" },
  { name: "FDG Entertainment" },
  { name: "Playtronic" },
  { name: "Wooster Games" },
  { name: "Tecmo" },
  { name: "Atlus" },
  { name: "TYPE-MOON" },
  { name: "DOG HOGGLER" },
  { name: "Assemble Entertainment" },
  { name: "Yostar Games" },
  { name: "Sony Interactive Entertainment" },
  { name: "Laniatus LLC" },
  { name: "Larian Studios" },
  { name: "STREAMSIX" },
  { name: "Strategy First" },
  { name: "Firebird Software" },
  { name: "Accolade" },
  { name: "Plug In Digital" },
  { name: "Dandylion" },
  { name: "EA Sports" },
  { name: "Electronic Arts, Inc." },
  { name: "Jib Games" },
  { name: "Harvester Games" },
  { name: "Sega" },
  { name: "HotA Crew" },
  { name: "Netflix" },
  { name: "Visual Arts" },
  { name: "Square Enix" },
  { name: "Re-Logic" },
  { name: "Ubisoft Entertainment" },
  { name: "Capybara Games" },
  { name: "Gaijin Entertainment" }
];
  

const genres= [
  { name: "Shooter" },
  { name: "Arcade" },
  { name: "Platform" },
  { name: "Racing" },
  { name: "Adventure" },
  { name: "Tactical" },
  { name: "Puzzle" },
  { name: "Indie" },
  { name: "Role-playing (RPG)" },
  { name: "Sport" },
  { name: "Hack and slash/Beat em up" },
  { name: "Simulator" },
  { name: "Strategy" },
  { name: "Turn-based strategy (TBS)" },
  { name: "Visual Novel" },
  { name: "Card & Board Game" },
  { name: "Point-and-click" },
  { name: "Real Time Strategy (RTS)" },
  { name: "Quiz/Trivia" },
  { name: "Music" },
  { name: "Fighting" }
];   


const platforms= [
  { name: "Xbox Series X|S" },
  { name: "PlayStation 5" },
  { name: "Web browser" },
  { name: "PC (Microsoft Windows)" },
  { name: "Mac" },
  { name: "Linux" },
  { name: "Commodore C64/128/MAX" },
  { name: "Atari ST/STE" },
  { name: "Amiga" },
  { name: "Amstrad CPC" },
  { name: "PlayStation 3" },
  { name: "PlayStation 4" },
  { name: "Xbox One" },
  { name: "Nintendo Switch" },
  { name: "Satellaview" },
  { name: "DOS" },
  { name: "FM Towns" },
  { name: "Super Famicom" },
  { name: "Sega Master System/Mark III" },
  { name: "Android" },
  { name: "iOS" },
  { name: "Wii" },
  { name: "Nintendo DS" },
  { name: "PlayStation 2" },
  { name: "Xbox 360" },
  { name: "Xbox" },
  { name: "Nintendo GameCube" },
  { name: "PlayStation" },
  { name: "PlayStation Portable" },
  { name: "Dreamcast" },
  { name: "Nintendo Switch 2" },
  { name: "Meta Quest 2" },
  { name: "PlayStation VR2" },
  { name: "SteamVR" },
  { name: "Meta Quest 3" },
  { name: "Nintendo 3DS" },
  { name: "Nintendo Entertainment System" },
  { name: "Wii U" },
  { name: "Family Computer" },
  { name: "PlayStation Vita" },
  { name: "Google Stadia" },
  { name: "Super Nintendo Entertainment System" },
  { name: "Arcade" },
  { name: "ZX Spectrum" },
  { name: "Legacy Computer" },
  { name: "3DO Interactive Multiplayer" },
  { name: "Oculus Quest" },
  { name: "Sega Mega Drive/Genesis" }
];

for (const editor of editors) {
  const newEditor = await Editor.create({
    id: editor.id,
    name: editor.name,
  });
};

for (const genre of genres) {
  const newGenre = await Genre.create({
    id: genre.id,
    name: genre.name,
  });
};

for (const platform of platforms) {
  const newPlatform = await Platform.create({
    id: platform.id,
    name: platform.name,
  });
};

console.log("\n✅ Seeding done!\n");
console.log("---");
console.log("Data inserted:"); 
console.log("---");
console.log("");
await sequelize.close();