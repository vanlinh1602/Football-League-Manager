import { notification } from 'antd';
import type { Team } from 'features/teams/types';

import type { ActiveState } from './State/ActiveState';

export class ClassTeam {
  active: ActiveState;

  info: Team;

  constructor(state: ActiveState, info: Team) {
    this.active = state;
    this.info = info;
  }

  changeActiveTeam(state: ActiveState): void {
    this.active = state;
    notification.info({
      message: 'Đổi trạng thái thành công',
      description: `Đội bóng đã chuyển sang trạng thái ${state.constructor.name}`,
    });
  }

  signLeague(): boolean {
    return this.active.SignLeague();
  }

  async updateTeamInfo(info: Partial<Team>): Promise<void> {
    await this.active.updateInfo(info);
  }
}
