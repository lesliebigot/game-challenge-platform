export interface IChallenge {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  game_id: number;
  created_at: string;
  updated_at: string;
  participantUsers: IParticipantUser[];
  likedByUsers: ILikedByUser[];
  likeCount?: number;
  game: {
    id: number;
    title: string;
    image: string;
    platforms: {        
      name: string;
    }[];  // Remarquez le [] ici pour indiquer un tableau
  };
}


export interface IParticipantUser {
    id: number;
    pseudo: string;
    lastname: string;
    firstname: string;
    email: string;
    password: string;
    birthdate: string;
    created_at: string;
    updated_at: string;
    role_id: number;
    Participate: IParticipate;
  }

export interface IParticipate {
    proof: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    challenge_id: number;
  }
  
export interface ILikedByUser {
    id: number;
    pseudo: string;
    lastname: string;
    firstname: string;
    email: string;
    password: string;
    birthdate: string;
    created_at: string;
    updated_at: string;
    role_id: number;
    user_like_challenge: IUserLikeChallenge;
  }
  
export interface IUserLikeChallenge {
    created_at: string;
    updated_at: string;
    user_id: number;
    challenge_id: number;
  }
  



  