import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'types';

import { initialState } from './reducer';

const selectDomain = (state: RootState) => state?.playerStore || initialState;
const selectPath = (state: RootState, path: string) => path;

export const selectPlayerHandling = createSelector([selectDomain], (state) => state.handling);

export const selectLayers = createSelector([selectDomain], (state) => state.data);

export const selectPlayersOfTeams = createSelector(
  [selectLayers, selectPath],
  (players, path) => players?.[path]
);
