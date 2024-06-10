import type { Team } from 'features/teams/types';

export abstract class ActiveState {
  abstract SignLeague(): boolean;

  abstract updateInfo(info: Partial<Team>): Promise<void>;
}
