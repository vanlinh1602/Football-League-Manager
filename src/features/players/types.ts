export type PlayersStore = {
  handling: boolean;
  data?: CustomObject<CustomObject<Player>>;
};

export type Player = {
  id: string;
  name: string;
  avatar: string;
  role: string;
  team: string;
  description?: string;
  birthday?: number;
  country: string;
  number: number;
};
