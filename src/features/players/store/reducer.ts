import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';

import type { Player, PlayersStore } from '../types';

export const initialState: PlayersStore = { handling: false };

const slice = createSlice({
  name: 'playerStore',
  initialState,
  reducers: {
    fetchPlayers(
      state,
      action: PayloadAction<{ team: string; players: CustomObject<Player> } | undefined>
    ) {
      state.handling = false;
      if (action.payload) {
        const { team, players } = action.payload;
        state.data = {
          ...state.data,
          [team]: players,
        };
      }
    },
    getPlayers(state, _action: PayloadAction<string>) {
      state.handling = true;
    },
    updatePlayer(state, _action: PayloadAction<Player>) {
      state.handling = true;
    },
  },
});

export const { actions, name: key, reducer } = slice;
