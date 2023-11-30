import { createSlice } from 'utils/@reduxjs/toolkit';

import type { UserState } from '../types';

export const initialState: UserState = { handling: false };

const slice = createSlice({
  name: 'userStore',
  initialState,
  reducers: {},
});

export const { actions, name: key, reducer } = slice;
