import type { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import _ from 'lodash';
import { all, put, select, takeEvery } from 'redux-saga/effects';
import { backendService } from 'services';
import formatError from 'utils/formatError';

import type { Player } from '../types';
import { actions as playersAction } from './reducer';
import { selectPlayersOfTeams } from './selectors';

function* getPlayers(action: PayloadAction<string>) {
  try {
    const team = action.payload;
    const result: WithApiResult<Player[]> = yield backendService.post('api/getPlayers', { team });
    if (result.kind === 'ok') {
      if (result.data.length) {
        const players = _.keyBy(result.data, 'id');
        yield put(playersAction.fetchPlayers({ team, players }));
      } else {
        yield put(playersAction.fetchPlayers());
      }
    } else {
      yield put(playersAction.fetchPlayers());
      notification.error({
        message: 'Lỗi tra cứu',
        description: formatError(result),
      });
    }
  } catch (error) {
    yield put(playersAction.fetchPlayers());
    notification.error({
      message: 'Lỗi tra cứu',
      description: formatError(error),
    });
  }
}

function* updatePlayer(action: PayloadAction<Player>) {
  try {
    const playerData = action.payload;
    const { team, id } = playerData;

    const playersTeam: CustomObject<Player> = yield select((state) =>
      selectPlayersOfTeams(state, team)
    );
    const result: WithApiResult<string> = yield backendService.post('api/updatePlayer', {
      data: playerData,
    });

    if (result.kind === 'ok') {
      const dataUpdate = _.cloneDeep(playersTeam);
      _.set(dataUpdate, [id], playerData);

      yield put(playersAction.fetchPlayers({ team, players: dataUpdate }));
    } else {
      yield put(playersAction.fetchPlayers());
      notification.error({
        message: 'Lỗi cập nhật',
        description: formatError(result),
      });
    }
  } catch (error) {
    yield put(playersAction.fetchPlayers());
    notification.error({
      message: 'Lỗi cập nhập',
      description: formatError(error),
    });
  }
}

export default function* saga() {
  yield all([
    takeEvery(playersAction.getPlayers.type, getPlayers),
    takeEvery(playersAction.updatePlayer.type, updatePlayer),
  ]);
}
