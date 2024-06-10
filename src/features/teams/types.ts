export type TeamStore = {
  handling: boolean;
  data?: CustomObject<Team>;
};

export type Team = {
  id: string;
  name: string;
  background: string;
  logo: string;
  coach: string;
  captain: string;
  description: string;
  country: string;
  founding: number;
  active?: boolean;
};
