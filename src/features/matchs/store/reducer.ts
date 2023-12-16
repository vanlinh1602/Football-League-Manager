import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';

import type { Match, MatchStore } from '../types';

export const initialState: MatchStore = { handling: false };

const slice = createSlice({
  name: 'matchStore',
  initialState,
  reducers: {
    fetchMatchs(state, action: PayloadAction<CustomObject<Match> | undefined>) {
      state.handling = false;
      if (action.payload) {
        state.matches = {
          ...state.matches,
          ...action.payload,
        };
      }
    },
    getMatchs(state, _action: PayloadAction<string>) {
      state.handling = true;
    },
    updateMatch(state, _action: PayloadAction<Match>) {
      state.handling = true;
    },
  },
});

export const { actions, name: key, reducer } = slice;
