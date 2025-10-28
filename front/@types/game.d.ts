export interface IGameDetails {
  id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
  Genre: {
    id: number;
    name: string;
  };
  editor: {
    id: number;
    name: string;
  };
  platforms: {
    id: number;
    name: string;
    game_available_on_platform: {
      created_at: string;
      updated_at: string;
      game_id: number;
      platform_id: number;
    };
  }[];
  challenges: {
    id: number;
    title: string;
    description: string;
  }[];
}
