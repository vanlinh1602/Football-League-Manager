/* eslint-disable class-methods-use-this */
import { notification } from 'antd';
import type { Team } from 'features/teams/types';
import { backendService } from 'services';
import formatError from 'utils/formatError';

import { ActiveState } from './ActiveState';

export class InactiveTeam extends ActiveState {
  SignLeague(): boolean {
    notification.info({
      message: 'Thông báo',
      description: 'Không thể đăng ký giải đấu cho đội bóng không hoạt động',
    });
    return false;
  }

  async updateInfo(info: Partial<Team>): Promise<void> {
    try {
      const teamData = info;

      if (info.founding || info.logo || info.name) {
        notification.error({
          message: 'Lỗi cập nhật',
          description: 'Không thể cập nhật thông tin cơ bản của đội bóng',
        });
        return;
      }

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
