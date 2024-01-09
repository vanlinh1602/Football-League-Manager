import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from 'firebase/auth';
import { createSlice } from 'utils/@reduxjs/toolkit';

import type { UserState } from '../types';

export const initialState: UserState = { handling: false, email: '', id: '' };

const slice = createSlice({
  name: 'userStore',
  initialState,
  reducers: {
    signIn(state, _action: PayloadAction<User>) {
      state.handling = true;
    },
    fetchUser(state, action: PayloadAction<{ email: string; id: string }>) {
      state.handling = false;
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    signOut(state) {
      state.email = '';
      state.id = '';
    },
  },
});

export const { actions, name: key, reducer } = slice;
