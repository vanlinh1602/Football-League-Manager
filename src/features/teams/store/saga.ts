import type { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { all, put, takeLatest } from 'redux-saga/effects';
import { backendService } from 'services';
import formatError from 'utils/formatError';

import type { Team } from '../types';
import { actions as teamActions } from './reducer';

function* getTeams(action: PayloadAction<{ year: number }>) {
  try {
    const { year } = action.payload;
    const result: WithApiResult<CustomObject<Team>> = yield backendService.post('/api/getTeams', {
      year,
    });
    if (result.kind === 'ok') {
      yield put(teamActions.fetchTeam(result.data));
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

export default function* saga() {
  yield all([takeLatest(teamActions.getTeams.type, getTeams)]);
}
