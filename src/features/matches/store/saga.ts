import type { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import _ from 'lodash';
import { all, put, select, takeEvery } from 'redux-saga/effects';
import { backendService } from 'services';
import formatError from 'utils/formatError';

import type { Event, Match } from '../types';
import { actions as matchAction } from './reducer';
import { selectMatch } from './selectors';

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
function* getEvents(action: PayloadAction<string>) {
  try {
    const match = action.payload;
    const result: WithApiResult<Event[]> = yield backendService.post('api/getEvents', { match });
    if (result.kind === 'ok') {
      if (result.data.length) {
        const events = _.keyBy(result.data, 'id');
        yield put(matchAction.fetchEvents({ match, data: events }));
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

function* updateEvent(action: PayloadAction<Event>) {
  try {
    const eventData = action.payload;

    const result: WithApiResult<string> = yield backendService.post('api/updateEvent', {
      data: eventData,
    });

    if (result.kind === 'ok') {
      yield put(
        matchAction.fetchEvents({ match: eventData.match, data: { [eventData.id]: eventData } })
      );
      if (eventData.name === 'goals') {
        const match: Match = yield select((state) => selectMatch(state, eventData.match));
        const dataUpdate: Match = _.cloneDeep(match);
        if (eventData.detail.team === match.teamA) {
          const oldResult = _.get(match, ['mathResult', 'teamA'], 0);
          _.set(dataUpdate, ['mathResult', 'teamA'], oldResult + 1);
        } else {
          const oldResult = _.get(match, ['mathResult', 'teamB'], 0);
          _.set(dataUpdate, ['mathResult', 'teamB'], oldResult + 1);
        }
        yield put(matchAction.updateMatch(dataUpdate));
      }
    } else {
      yield put(matchAction.fetchMatchs());
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
    takeEvery(matchAction.getEvents.type, getEvents),
    takeEvery(matchAction.updateMatch.type, updateMatch),
    takeEvery(matchAction.updateEvent.type, updateEvent),
  ]);
}
