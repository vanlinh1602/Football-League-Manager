import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'types';

import { initialState } from './reducer';

const selectDomain = (state: RootState) => state?.teamStore || initialState;

export const selectTeamHandling = createSelector([selectDomain], (state) => state.handling);

export const selectTeamData = createSelector([selectDomain], (state) => state.data);
