import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'types';

import { initialState } from './reducer';

const selectDomain = (state: RootState) => state?.userStore || initialState;

export const selectUserHandling = createSelector([selectDomain], (state) => state.handling);
