import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';

import type { League, LeagueStore } from '../types';

export const initialState: LeagueStore = { handling: false };

const slice = createSlice({
  name: 'leagueStore',
  initialState,
  reducers: {
    fetchLeagues(state, action: PayloadAction<CustomObject<League>>) {
      state.handling = false;
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
    getLeagues(state) {
      state.handling = true;
    },
    updateLeague(state, _action: PayloadAction<League>) {
      state.handling = true;
    },
  },
});

export const { actions, name: key, reducer } = slice;
