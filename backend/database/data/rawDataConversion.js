import rawdata from "./rawdata.js";

function transformGameData(rawGames) {
  const uniqueEditors = {};
  const uniqueGenders = {};
  const uniquePlatforms = {};
  const transformedGames = [];

  rawGames.forEach((rawGame) => {
    // 1. Transformation des éditeurs (involved_companies)
    let editorName = null;
    if (rawGame.involved_companies && Array.isArray(rawGame.involved_companies)) {
      const editorData = rawGame.involved_companies.find(ic => ic.publisher);
      if (editorData && editorData.company) {
        editorName = editorData.company.name;
        if (!uniqueEditors[editorName]) {
          uniqueEditors[editorName] = { "name": editorName };
        }
      }
    }

    // 2. Transformation des genres
    const genderNames = [];
    if (rawGame.genres && Array.isArray(rawGame.genres)) {
      rawGame.genres.forEach(genre => {
        if (genre && genre.name) {
          genderNames.push(genre.name);
          if (!uniqueGenders[genre.name]) {
            uniqueGenders[genre.name] = { "name": genre.name };
          }
        }
      });
    }

    // 3. Transformation des plateformes
    const platformNames = [];
    if (rawGame.platforms && Array.isArray(rawGame.platforms)) {
      rawGame.platforms.forEach(platform => {
        if (platform && platform.name) {
          platformNames.push(platform.name);
          if (!uniquePlatforms[platform.name]) {
            uniquePlatforms[platform.name] = { "name": platform.name };
          }
        }
      });
    }

    // 4. Construction de l'objet jeu transformé
    const transformedGame = {
      "title": rawGame.name || "Titre inconnu",
      "description": rawGame.first_release_date
        ? `Jeu vidéo ${rawGame.name || "Titre inconnu"} sorti en ${new Date(rawGame.first_release_date * 1000).getFullYear()}`
        : "Jeu vidéo sans date de sortie",
      "image": rawGame.cover && rawGame.cover.image_id
        ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${rawGame.cover.image_id}.jpg`
        : null,
      "editorName": editorName,
      "genderNames": genderNames,  // Tableau rempli avec les noms des genres
      "platformNames": platformNames,  // Tableau rempli avec les noms des plateformes
    };

    transformedGames.push(transformedGame);
  });

  return {
    "games": transformedGames,
    // "editors": Object.values(uniqueEditors),
    // "genders": Object.values(uniqueGenders),
    // "platforms": Object.values(uniquePlatforms),
  };
}



const transformedData = transformGameData(rawdata);
console.log(JSON.stringify(transformedData, null, 2));
