export type TeamStore = {
  handling: boolean;
  data?: CustomObject<Team>;
};

export type Team = {
  id: string;
  name: string;
  logo: string;
  owner: string;
};
