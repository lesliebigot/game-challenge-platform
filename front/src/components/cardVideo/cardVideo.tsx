import { useState } from "react";

interface CardVideoProps {
  title?: string;
  platform?: "youtube" | "twitch";
  videoUrl?: string;
  thumbnailUrl?: string;
  challengerPseudo?: string;
  duration?: string;
  publishedAt?: string;
  initialLikes?: number;
}

export function CardVideo({
  title = "Epic Gaming Moment - Best Highlights",
  platform = "youtube",
  videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  thumbnailUrl = "https://via.placeholder.com/320x180?text=Video+Thumbnail",
  challengerPseudo = "ProGamer123",
  duration = "10:30",
  publishedAt = "il y a 2 jours",
  initialLikes = 42
}: CardVideoProps) {
  
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  
  const handleVideoClick = () => {
    window.open(videoUrl, "_blank", "noopener,noreferrer");
  };

  const handleLikeClick = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const getPlatformColor = () => {
    return platform === "youtube" 
      ? "bg-red-500" 
      : "bg-purple-500";
  };

  const formatLikes = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer max-w-sm">
      {/* Thumbnail avec overlay */}
      <figure className="relative overflow-hidden">
        <img 
          src={thumbnailUrl} 
          alt={title}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          onClick={handleVideoClick}
        />
        
        {/* Overlay play button */}
        <div 
          className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
          onClick={handleVideoClick}
        >
          <div className="bg-white/90 rounded-full p-3">
            <i className="fa-solid fa-play text-2xl text-black ml-1"></i>
          </div>
        </div>
        
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
        
        {/* Platform badge */}
        <div className={`absolute bottom-2 left-2 ${getPlatformColor()} text-white text-xs px-2  py-1 flex align-center rounded`}>
          <span className="capitalize">{platform}</span>
        </div>
      </figure>
      
      {/* Card body */}
      <div className="card-body p-4">
        <h3 
          className="card-title text-sm font-semibold line-clamp-2 hover:text-primary cursor-pointer"
          onClick={handleVideoClick}
          title={title}
        >
          {title}
        </h3>
        
        {/* Pseudo du challenger */}
        <div className="flex items-center gap-2 text-xs text-primary mt-1">
          <i className="fa-solid fa-user"></i>
          <span className="font-medium">{challengerPseudo}</span>
          <span>•</span>
          <span>{publishedAt}</span>
        </div>
        
        {/* Actions */}
        <div className="card-actions justify-between items-center mt-3">
          <button 
            className="btn btn-primary btn-sm"
            onClick={handleVideoClick}
          >
            <i className="fa-solid fa-external-link-alt mr-1"></i>
            Regarder
          </button>
          
          <div className="flex gap-2 items-center">
            <button 
              className={`btn btn-ghost btn-circle btn-xs transition-colors ${
                isLiked ? "text-blue-500" : ""
              }`}
              onClick={handleLikeClick}
              title={isLiked ? "Je n'aime plus" : "J'aime cette vidéo"}
            >
              <i className={`${isLiked ? "fa-solid" : "fa-regular"} fa-thumbs-up`}></i>
            </button>
            <span className="text-xs text-base-content/70 font-medium">
              {formatLikes(likes)}
            </span>
            <button className="btn btn-ghost btn-circle btn-xs" title="Partager">
              <i className="fa-solid fa-share"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}