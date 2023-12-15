export type LeagueStore = {
  handling: boolean;
  data?: CustomObject<League>;
};

export type League = {
  id: string;
  name: string;
  image: string;
  start: number;
  end: number;
  participants: string[];
};
