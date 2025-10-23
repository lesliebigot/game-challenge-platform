import { sequelize, Game, User, Role, Challenge, Genre, Platform, Editor, _Participate } from "../models/index.js";

console.log("🚧 Seeding des tables");

// 1. Créer les jeux et les associer aux éditeurs, genres et plateformes
const game1 = await Game.create({
  title: "The Legend of Zelda: Breath of the Wild",
  description: "Un jeu d'aventure en monde ouvert.",
  image: "https://example.com/zelda.jpg",
});
const game2 = await Game.create({
  title: "Assassin's Creed Valhalla",
  description: "Un RPG d'action dans un monde viking.",
  image: "https://example.com/ac-valhalla.jpg",
});

// Récupérer les éditeurs, genres et plateformes existants
const editor37 = await Editor.findByPk(37); // Nintendo
const editor38 = await Editor.findByPk(38); // Ubisoft
const genre1 = await Genre.findByPk(1); // Aventure
const genre2 = await Genre.findByPk(2); // Action
const platform1 = await Platform.findByPk(1); // PC
const platform2 = await Platform.findByPk(2); // Switch

await game1.setEditor(editor37);
await game2.setEditor(editor38);
await game1.setGenre(genre1);
await game2.setGenre(genre2);
await game1.addPlatform(platform2); // Switch pour Zelda
await game2.addPlatform(platform1); // PC pour Assassin's Creed

// 2. Créer les rôles et utilisateurs
const roleUser = await Role.create({ name: "user" });
const roleAdmin = await Role.create({ name: "admin" });

const user1 = await User.create({
  pseudo: "test_user",
  lastname: "Doe",
  firstname: "John",
  email: "john.doe@example.com",
  password: "password123",
  birthdate: new Date("1990-01-01"),
  role_id: roleUser.id, // Assigner le role_id directement
});

const user2 = await User.create({
  pseudo: "test_admin",
  lastname: "Smith",
  firstname: "Jane",
  email: "jane.smith@example.com",
  password: "admin123",
  birthdate: new Date("1995-05-15"),
  role_id: roleAdmin.id, // Assigner le role_id directement
});

// 3. Créer 2 défis (1 pour chaque jeu)
const challenge1 = await Challenge.create({
  title: "Terminer Zelda en mode difficile",
  description: "Terminer The Legend of Zelda: Breath of the Wild en mode difficile avant le 30/11/2025.",
});
await challenge1.setGame(game1);
await challenge1.setCreatorUser(user2); // Défi créé par l'admin

const challenge2 = await Challenge.create({
  title: "100% Assassin's Creed Valhalla",
  description: "Terminer tous les quêtes secondaires et collectibles d'Assassin's Creed Valhalla.",
});
await challenge2.setGame(game2);
await challenge2.setCreatorUser(user2);

// 4. Ajouter une participation de user1 au challenge1 avec preuve
await user1.addParticipatedChallenges(challenge1, {
  through: { proof: "https://example.com/proof/john_zelda_difficult.mp4" },
});

// 5. Ajouter un jeu favori pour user1
await user1.addFavoriteGames(game1);

// 6. Ajouter un like de user1 sur challenge2
await user1.addLikedChallenges(challenge2);

console.log("✅ Données insérées :");
console.log("- 2 jeux (Zelda, Assassin's Creed)");
console.log("- 2 utilisateurs (test_user, test_admin)");
console.log("- 2 défis (1 par jeu)");
console.log("- 1 participation avec preuve vidéo");
console.log("- 1 jeu favori");
console.log("- 1 like de défi");

await sequelize.close();

