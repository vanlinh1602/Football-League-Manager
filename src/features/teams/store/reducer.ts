import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';

import type { Team, TeamStore } from '../types';

export const initialState: TeamStore = { handling: false };

const slice = createSlice({
  name: 'teamStore',
  initialState,
  reducers: {
    fetchTeam(state, action: PayloadAction<CustomObject<Team>>) {
      state.handling = false;
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
    getTeams(state, _action: PayloadAction<{ year: number }>) {
      state.handling = true;
    },
  },
});

export const { actions, name: key, reducer } = slice;
