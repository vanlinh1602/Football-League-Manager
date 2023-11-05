import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'types';

import { initialState } from './reducer';

const selectDomain = (state: RootState) => state?.homeStore || initialState;

export const selectWating = createSelector([selectDomain], (state) => state);
