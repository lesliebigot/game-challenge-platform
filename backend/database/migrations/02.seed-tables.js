import { sequelize, Game, User, Role, Challenge, Genre, Platform, Editor, Participate  } from "../models/index.js";
import { games } from "../data/games.js";
import { editors } from "../data/editors.js";
import { platforms } from "../data/platforms.js";
import { genres } from "../data/genders.js";

// 1. Insérer les éditeurs, genres et plateformes
for (const editor of editors) {
  await Editor.create({
    id: editor.id,
    name: editor.name,
  });
}
for (const genre of genres) {
  await Genre.create({
    id: genre.id,
    name: genre.name,
  });
}
for (const platform of platforms) {
  await Platform.create({
    id: platform.id,
    name: platform.name,
  });
}

// 2. Insérer les jeux et associer les relations
for (const gameData of games) {
  // Récupérer l'ID de l'éditeur (One-to-Many)
  let editorId = null;
  if (gameData.editorName) {
    const editor = await Editor.findOne({ where: { name: gameData.editorName } });
    editorId = editor ? editor.id : null;
  }

  // Récupérer l'ID du premier genre (One-to-Many)
  let genreId = null;
  if (gameData.genderNames && gameData.genderNames.length > 0) {
    const firstGenreName = gameData.genderNames[0]; // On prend le premier genre
    const genre = await Genre.findOne({ where: { name: firstGenreName } });
    genreId = genre ? genre.id : null;
  }

  // Créer le jeu avec l'ID du genre
  const game = await Game.create({
    title: gameData.title,
    description: gameData.description,
    image: gameData.image,
    editor_id: editorId, // Associe l'ID de l'éditeur
    Genre_id: genreId,  // Associe l'ID du premier genre
  });

  // Associer les plateformes (Many-to-Many)
  if (gameData.platformNames && gameData.platformNames.length > 0) {
    const platformInstances = await Platform.findAll({
      where: { name: gameData.platformNames }
    });
    if (platformInstances.length > 0) {
      await game.setPlatforms(platformInstances);
    }
  }

  console.log(`✅ Jeu "${gameData.title}" inséré avec succès !`);
}

console.log("\n✅ Seeding done!\n");
console.log("---");
console.log("Data inserted:"); 
console.log("---");
await sequelize.close();