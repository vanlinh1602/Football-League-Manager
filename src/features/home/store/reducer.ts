import { createSlice } from 'utils/@reduxjs/toolkit';

import type { HomeState } from '../types';

export const initialState: HomeState = {};

const slice = createSlice({
  name: 'homeStore',
  initialState,
  reducers: {},
});

export const { actions, name: key, reducer } = slice;
