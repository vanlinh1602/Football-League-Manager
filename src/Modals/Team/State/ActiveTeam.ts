/* eslint-disable class-methods-use-this */
import { notification } from 'antd';
import type { Team } from 'features/teams/types';
import { backendService } from 'services';
import formatError from 'utils/formatError';

import { ActiveState } from './ActiveState';

export class ActiveTeam extends ActiveState {
  SignLeague(): boolean {
    notification.info({
      message: 'Thông báo',
      description: 'Đăng ký giải đấu thành công',
    });
    return true;
  }

  async updateInfo(info: Partial<Team>): Promise<void> {
    try {
      const teamData = info;
      const result: WithApiResult<string> = await backendService.post('api/updateTeam', {
        data: teamData,
      });
      if (result.kind === 'ok') {
        notification.success({
          message: 'Cập nhập thành công',
        });
      } else {
        notification.error({
          message: 'Lỗi cập nhật',
          description: formatError(result),
        });
      }
    } catch (error) {
      notification.error({
        message: 'Lỗi cập nhập',
        description: formatError(error),
      });
    }
  }
}
