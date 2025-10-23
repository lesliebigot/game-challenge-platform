// ASSOCIATIONS
import sequelize from "./sequelizeClient.js";
import { User } from "./user.js";
import { Role } from "./role.js";
import { Challenge } from "./challenge.js";
import { Game } from "./game.js";
import { Genre } from "./genre.js";
import { Platform } from "./platform.js";
import { Editor } from "./editor.js";
import { Participate } from "./partcipate.js";

//**ASSOCIATIONS One-to-Many**

// User et Role (1,1 - 1,N)
User.belongsTo(Role, {
  foreignKey: { name: "role_id", allowNull: false }, // Garantit que chaque utilisateur a un rôle
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

// // Game et Genre (1,1 - 1,N)
// Game.belongsTo(Genre, {
//   foreignKey: "Genre_id",
//   as: "Genre" // un jeu a ce genre
// });
// Genre.hasMany(Game, {
//   foreignKey: "Genre_id",
//   as: "games" // ce genre appartient à plusieurs jeux
// });

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

// Game et Platform (via game_available_on_platform)
Game.belongsToMany(Platform, {
  through: "game_available_on_platform",
  foreignKey: "game_id",
  otherKey: "platform_id",
  as: "platforms" // un jeu a plusieurs plateformes
});
Platform.belongsToMany(Game, {
  through: "game_available_on_platform",
  foreignKey: "platform_id",
  otherKey: "game_id",
  as: "games" // une plateforme a plusieurs jeux
});

// User et Game (via user_favorite_game)
User.belongsToMany(Game, {  
  through: "user_favorite_game",
  foreignKey: "user_id",
  otherKey: "game_id",
  as: "favoriteGames" // un utilisateur a plusieurs jeux en favoris
});
Game.belongsToMany(User, {
  through: "user_favorite_game",
  foreignKey: "game_id",
  otherKey: "user_id",
  as: "favoritedByUsers" // un jeu peut être dans les favoris de plusieurs utilisateurs
});

// User et Challenge (via user_like_challenge)
User.belongsToMany(Challenge, {
  through: "user_like_challenge",
  foreignKey: "user_id",
  otherKey: "challenge_id",
  as: "likedChallenges" // challenges likés par cet utilisateur
});
Challenge.belongsToMany(User, {
  through: "user_like_challenge",
  foreignKey: "challenge_id",
  otherKey: "user_id",
  as: "likedByUsers" // utilisateurs ayant liké ce challenge
});

// User et Challenge (via participate)
User.belongsToMany(Challenge, {
  through: Participate, // Modèle pour la table de liaison pour la participation entre User et Challenge avec ajout de l'attribut "proof"
  foreignKey: "user_id",
  otherKey: "challenge_id",
  as: "participatedChallenges" // Challenges auxquels l'utilisateurs a partcipé
});
Challenge.belongsToMany(User, {
  through: Participate,
  foreignKey: "challenge_id",
  otherKey: "user_id",
  as: "participantUsers" // Utilisateurs ayant participé à ce challenge
});

// Remplace la relation One-to-Many par Many-to-Many
Game.belongsToMany(Genre, {
  through: "game_genre",
  foreignKey: "game_id",
  otherKey: "genre_id",
  as: "genres"
});
Genre.belongsToMany(Game, {
  through: "game_genre",
  foreignKey: "genre_id",
  otherKey: "game_id",
  as: "games"
});

export {
  sequelize,
  Game,
  User,
  Role,
  Challenge,
  Genre,
  Platform,
  Editor,
  Participate,
};