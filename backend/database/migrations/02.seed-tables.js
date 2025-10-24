import { sequelize, Game, User, Role, Challenge, Genre, Platform, Editor, Participate  } from "../models/index.js";
import { games } from "../data/games.js";
import { editors } from "../data/editors.js";
import { platforms } from "../data/platforms.js";
import { genres } from "../data/genders.js";
import { users } from "../data/users.js";
import { challenges } from "../data/challenges.js";
import { gameProofs } from "../data/gameProofs.js";


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

// 3. Créer les rôles
const roleUser = await Role.create({ name: "user" });
const roleAdmin = await Role.create({ name: "admin" });
console.log("✅ Rôles insérés avec succès !");

// 4. Créer les utilisateurs
for (const userData of users) {
  await User.create({
    pseudo: userData.pseudo,
    lastname: userData.lastname,
    firstname: userData.firstname,
    email: userData.email,
    password: userData.password,
    birthdate: userData.birthdate,
    role_id: userData.isAdmin ? roleAdmin.id : roleUser.id, // Assignation dynamique du rôle
  });
}
console.log("✅ Users insérés avec succès !");



// 5. Créer une vingtaine de défis et les associer aléatoirement aux utilisateurs
const dbUsers = await User.findAll(); // Récupère TOUS les utilisateurs de la base
for (const challengeData of challenges) {
  const game = await Game.findOne({ where: { title: challengeData.gameTitle } });
  if (game) {
    const challenge = await Challenge.create({
      title: challengeData.title,
      description: challengeData.description,
    });
    await challenge.setGame(game);

    // Sélectionne un utilisateur aléatoire parmi ceux de la base
    const randomUser = dbUsers[Math.floor(Math.random() * dbUsers.length)];
    await challenge.setCreatorUser(randomUser);
  }
}

// 6. Ajouter les participations
const allUsers = await User.findAll();
const allChallenges = await Challenge.findAll({ include: { model: Game, as: "game" } });

for (let i = 0; i < 20; i++) {
  const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
  const randomChallenge = allChallenges[Math.floor(Math.random() * allChallenges.length)];
  const gameTitle = randomChallenge.game.title;
  const proofsForGame = gameProofs[gameTitle] || ["https://youtu.be/generic_proof"];
  const randomProof = proofsForGame[Math.floor(Math.random() * proofsForGame.length)];

  await randomUser.addParticipatedChallenges(randomChallenge, {
    through: { proof: randomProof }
  });

  console.log(`✅ ${randomUser.pseudo} → "${randomChallenge.title}" (${gameTitle}) : ${randomProof}`);
}

// 7. Ajouter des jeux en favoris aux utilisateurs (5 favoris aléatoires par utilisateur)
const allUsers2 = await User.findAll();
const allGames = await Game.findAll();

for (const user of allUsers2) {
  // Mélanger les jeux et en choisir 5 aléatoires
  const shuffledGames = [...allGames].sort(() => 0.5 - Math.random());
  const favoriteGames = shuffledGames.slice(0, 5); // 5 jeux favoris par utilisateur

  for (const game of favoriteGames) {
    await user.addFavoriteGames(game); // Utilise l'alias "favoriteGames" défini dans le modèle
    console.log(`✅ ${user.pseudo} a ajouté "${game.title}" en favoris.`);
  }
}

console.log("\n✅ Favoris ajoutés pour tous les utilisateurs !");

//TODO 7. Ajouter des likes de users sur les challenges


console.log("\n✅ Seeding done!\n");
console.log("---");
console.log("Data inserted:"); 
console.log("---");
await sequelize.close();