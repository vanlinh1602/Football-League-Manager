import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from 'firebase/auth';
import { all, put, takeLatest } from 'redux-saga/effects';

import { actions as userActions } from './reducer';

function* signIn(action: PayloadAction<User>) {
  const user = action.payload;
  yield put(userActions.fetchUser({ email: user.email || '', id: user.uid }));
}

export default function* saga() {
  yield all([takeLatest(userActions.signIn.type, signIn)]);
}
