// ASSOCIATIONS

import { User } from "./User.js";
import { Role } from "./role.js";
import { Challenge } from "./Challenge.js";
import { Game } from "./Game.js";
import { Gender } from "./gender.js";
import { Platform } from "./platform.js";
import { Editor } from "./editor.js";

//**ASSOCIATIONS One-to-Many**

// User et Role (1,1 - 1,N)
User.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role" // l'utilisateur a ce role
});
Role.hasMany(User, {
  foreignKey: "role_id",
  as: "users" // ce role appartient à plusieurs utilisateurs
});

// User et Challenge (0,N - 1,1)
User.hasMany(Challenge, {
  foreignKey: "user_id", 
  as: "createdChallenges" // createur du challenge
});
Challenge.belongsTo(User, {
  foreignKey: "user_id",
  as: "creatorUser" // challenge créé par cet utilisateur
});

// Game et Gender (1,1 - 1,N)
Game.belongsTo(Gender, {
    foreignKey: "gender_id",
    as: "gender" // un jeu a ce genre
});
Gender.hasMany(Game, {
  foreignKey: "gender_id",
  as: "games" // ce genre appartient à plusieurs jeux
});

// Game et Editor (1,1 - 1,N)
Game.belongsTo(Editor, {
  foreignKey: "editor_id",
  as: "editor" // un jeu a un éditeur
});
Editor.hasMany(Game, {
  foreignKey: "editor_id",
  as: "games" // cet éditeur appartient à plusieurs jeux
});

// Challenge et Game (0,N - 1,1)
Challenge.belongsTo(Game, {
  foreignKey: "game_id",
  as: "game" // un challenge est associé à un jeu
});
Game.hasMany(Challenge, {
  foreignKey: "game_id",
  as: "challenges" // un jeu peut avoir plusieurs challenges
});

//**ASSOCIATIONS Many-to-Many**

// Game et Platform (via operate)
Game.belongsToMany(Platform, {
  through: "operate",
  foreignKey: "game_id",
  otherKey: "platform_id",
  as: "platforms" // un jeu a plusieurs plateformes
});
Platform.belongsToMany(Game, {
  through: "operate",
  foreignKey: "platform_id",
  otherKey: "game_id",
  as: "games" // une plateforme a plusieurs jeux
});

// User et Game (via favorite)
User.belongsToMany(Game, {  
  through: "favorite",
  foreignKey: "user_id",
  otherKey: "game_id",
  as: "favoriteGames" // un utilisateur a plusieurs jeux en favoris
});
Game.belongsToMany(User, {
  through: "favorite",
  foreignKey: "game_id",
  otherKey: "user_id",
  as: "favoritedByUsers" // un jeu peut être dans les favoris de plusieurs utilisateurs
});

// User et Challenge (via like)
User.belongsToMany(Challenge, {
  through: "like",
  foreignKey: "user_id",
  otherKey: "challenge_id",
  as: "likedChallenges" // challenges likés par cet 
});
Challenge.belongsToMany(User, {
  through: "like",
  foreignKey: "challenge_id",
  otherKey: "user_id",
  as: "likedByUsers"
});

// User et Challenge (via participate)
User.belongsToMany(Challenge, {
  through: "participate",
  // TODO : est-ce la bonne solution pour ajouter la preuve vidéo ?
  //through: {
  //  model: "participate",
  //  attributes: ["preuve"]  // spécifier l'attribut supplémentaire
  //},
  foreignKey: "user_id",
  otherKey: "challenge_id",
  as: "participatedChallenges" // Challenges auxquels l'utilisateurs a partcipé
});
Challenge.belongsToMany(User, {
  through: "participate",
  foreignKey: "challenge_id",
  otherKey: "user_id",
  as: "participantUsers" // Utilisateurs ayant participé à ce challenge
});