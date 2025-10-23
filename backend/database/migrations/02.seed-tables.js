import { sequelize, Game, User, Role, Challenge, Genre, Platform, Editor, Participate  } from "../models/index.js";
import { games } from "../data/games.js";
import { editors } from "../data/editors.js";
import { platforms } from "../data/platforms.js";
import { genres } from "../data/genders.js";

// 1. Insérer les éditeurs, genres et plateformes (déjà fait)
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

  // Créer le jeu (sans Genre_id, car c'est maintenant Many-to-Many)
  const game = await Game.create({
    title: gameData.title,
    description: gameData.description,
    image: gameData.image,
    editor_id: editorId, // Associe l'ID de l'éditeur
  });

  // Associer les genres (Many-to-Many)
  if (gameData.genderNames && gameData.genderNames.length > 0) {
    const genreInstances = await Genre.findAll({
      where: { name: gameData.genderNames }
    });
    if (genreInstances.length > 0) {
      await game.setGenres(genreInstances); // Utilise setGenres pour Many-to-Many
    }
  }

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