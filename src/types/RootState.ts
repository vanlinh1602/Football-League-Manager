import type { TeamStore } from 'features/teams/types';
import type { UserState } from 'features/user/types';

export type RootState = {
  userStore: UserState;
  teamStore: TeamStore;
};
