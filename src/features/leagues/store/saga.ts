import type { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import _ from 'lodash';
import { all, put, takeEvery } from 'redux-saga/effects';
import { backendService } from 'services';
import formatError from 'utils/formatError';

import type { League } from '../types';
import { actions as leagueAction } from './reducer';

function* getLeagues() {
  try {
    const result: WithApiResult<League[]> = yield backendService.post('api/getLeagues', {});
    if (result.kind === 'ok') {
      if (result.data.length) {
        const leagues = _.keyBy(result.data, 'id');
        yield put(leagueAction.fetchLeagues(leagues));
      } else {
        yield put(leagueAction.fetchLeagues({}));
      }
    } else {
      yield put(leagueAction.fetchLeagues({}));
      notification.error({
        message: 'Lỗi tra cứu',
        description: formatError(result),
      });
    }
  } catch (error) {
    yield put(leagueAction.fetchLeagues({}));
    notification.error({
      message: 'Lỗi tra cứu',
      description: formatError(error),
    });
  }
}

function* updateLeague(action: PayloadAction<League>) {
  try {
    const data = action.payload;

    const result: WithApiResult<string> = yield backendService.post('api/updateLeague', {
      data,
    });

    if (result.kind === 'ok') {
      yield put(leagueAction.fetchLeagues({ [data.id]: data }));
    } else {
      yield put(leagueAction.fetchLeagues({}));
      notification.error({
        message: 'Lỗi cập nhật',
        description: formatError(result),
      });
    }
  } catch (error) {
    yield put(leagueAction.fetchLeagues({}));
    notification.error({
      message: 'Lỗi cập nhập',
      description: formatError(error),
    });
  }
}

export default function* saga() {
  yield all([
    takeEvery(leagueAction.getLeagues.type, getLeagues),
    takeEvery(leagueAction.updateLeague.type, updateLeague),
  ]);
}
