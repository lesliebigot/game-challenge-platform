import data from "./data.js";

function convertGameData(input) {
    return input.map(game => {
      const genres = game.genres?.map(g => g.name).join(", ") || "Inconnu";
      const platforms = game.platforms?.map(p => p.name).join(", ") || "Inconnu";
  
      // Vérifie si involved_companies existe et est un tableau
      const publishers = game.involved_companies
        ?.filter(ic => ic?.publisher)
        ?.map(ic => ic.company?.name)
        ?.join(", ") || "Inconnu";
  
      const developers = game.involved_companies
        ?.filter(ic => !ic?.publisher)
        ?.map(ic => ic.company?.name)
        ?.join(", ") || "Inconnu";
  
      const description = `Un jeu de type ${genres}, ${publishers ? `édité par ${publishers}` : `développé par ${developers}`}. Disponible sur ${platforms}.`;
  
      return {
        title: game.name,
        description: description,
        image: game.cover ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg` : null
      };
    });
  }
  
  
const convertedData = convertGameData(data);
console.log(convertedData);