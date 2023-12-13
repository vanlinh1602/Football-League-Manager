import type { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import _ from 'lodash';
import { all, put, takeLatest } from 'redux-saga/effects';
import { backendService } from 'services';
import formatError from 'utils/formatError';

import type { Team } from '../types';
import { actions as teamActions } from './reducer';

function* getTeams() {
  try {
    const result: WithApiResult<Team[]> = yield backendService.post('api/getTeams', {});
    if (result.kind === 'ok') {
      if (result.data.length) {
        const teams = _.keyBy(result.data, 'id');
        yield put(teamActions.fetchTeam(teams));
      } else {
        yield put(teamActions.fetchTeam({}));
      }
    } else {
      yield put(teamActions.fetchTeam({}));
      notification.error({
        message: 'Lỗi tra cứu',
        description: formatError(result),
      });
    }
  } catch (error) {
    yield put(teamActions.fetchTeam({}));
    notification.error({
      message: 'Lỗi tra cứu',
      description: formatError(error),
    });
  }
}

function* updateTeam(action: PayloadAction<Team>) {
  try {
    const teamData = action.payload;
    const result: WithApiResult<string> = yield backendService.post('api/updateTeam', {
      data: teamData,
    });

    if (result.kind === 'ok') {
      yield put(teamActions.fetchTeam({ [teamData.id]: teamData }));
    } else {
      yield put(teamActions.fetchTeam({}));
      notification.error({
        message: 'Lỗi cập nhật',
        description: formatError(result),
      });
    }
  } catch (error) {
    yield put(teamActions.fetchTeam({}));
    notification.error({
      message: 'Lỗi cập nhập',
      description: formatError(error),
    });
  }
}

export default function* saga() {
  yield all([
    takeLatest(teamActions.getTeams.type, getTeams),
    takeLatest(teamActions.updateTeam.type, updateTeam),
  ]);
}
