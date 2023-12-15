import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'types';

import { initialState } from './reducer';

const selectDomain = (state: RootState) => state?.leagueStore || initialState;

export const selectLeagueHandling = createSelector([selectDomain], (state) => state.handling);

export const selectLeagues = createSelector([selectDomain], (state) => state.data);
