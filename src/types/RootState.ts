import type { LeagueStore } from 'features/leagues/types';
import type { MatchStore } from 'features/matchs/types';
import type { PlayersStore } from 'features/players/types';
import type { TeamStore } from 'features/teams/types';
import type { UserState } from 'features/user/types';

export type RootState = {
  userStore: UserState;
  teamStore: TeamStore;
  playerStore: PlayersStore;
  leagueStore: LeagueStore;
  matchStore: MatchStore;
};
