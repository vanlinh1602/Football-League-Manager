import type { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import _ from 'lodash';
import { all, put, takeEvery } from 'redux-saga/effects';
import { backendService } from 'services';
import formatError from 'utils/formatError';

import type { Match } from '../types';
import { actions as matchAction } from './reducer';

function* getMatchs(action: PayloadAction<string>) {
  try {
    const league = action.payload;
    const result: WithApiResult<Match[]> = yield backendService.post('api/getMatchs', { league });
    if (result.kind === 'ok') {
      if (result.data.length) {
        const leagues = _.keyBy(result.data, 'id');
        yield put(matchAction.fetchMatchs(leagues));
      } else {
        yield put(matchAction.fetchMatchs({}));
      }
    } else {
      yield put(matchAction.fetchMatchs());
      notification.error({
        message: 'Lỗi tra cứu',
        description: formatError(result),
      });
    }
  } catch (error) {
    yield put(matchAction.fetchMatchs());
    notification.error({
      message: 'Lỗi tra cứu',
      description: formatError(error),
    });
  }
}

function* updateMatch(action: PayloadAction<Match>) {
  try {
    const data = action.payload;

    const result: WithApiResult<string> = yield backendService.post('api/updateMatch', {
      data,
    });

    if (result.kind === 'ok') {
      yield put(matchAction.fetchMatchs({ [data.id]: data }));
    } else {
      yield put(matchAction.fetchMatchs({}));
      notification.error({
        message: 'Lỗi cập nhật',
        description: formatError(result),
      });
    }
  } catch (error) {
    yield put(matchAction.fetchMatchs());
    notification.error({
      message: 'Lỗi cập nhập',
      description: formatError(error),
    });
  }
}

export default function* saga() {
  yield all([
    takeEvery(matchAction.getMatchs.type, getMatchs),
    takeEvery(matchAction.updateMatch.type, updateMatch),
  ]);
}
