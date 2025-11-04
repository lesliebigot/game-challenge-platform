// Interface pour les informations de participation
export interface Participation {
  proof: string;
  created_at: string; // Ou Date si vous prévoyez de le parser
  updated_at: string; // Ou Date
  user_id: number;
  challenge_id: number;
}

// Interface pour un défi simple (utilisé dans createdChallenges)
export interface Challenge {
  id: number;
  title: string;
  description: string;
}

// Interface pour un défi auquel l'utilisateur a participé
export interface ParticipatedChallenge extends Challenge {
  Participate: Participation;
}

// Interface principale pour l'utilisateur
export interface IUser {
  id: number;
  pseudo: string;
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  birthdate: string; // Ou Date
  created_at: string; // Ou Date
  updated_at: string; // Ou Date
  role_id: number;
  createdChallenges: Challenge[];
  participatedChallenges: ParticipatedChallenge[];
  favoriteGames: any[]; // Remplacer 'any' par une interface 'Game' si vous la connaissez
}
