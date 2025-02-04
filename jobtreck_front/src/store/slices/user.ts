import { createSlice } from '@reduxjs/toolkit';

import { STATUS } from '~/literals';

import { UserState } from '~/types';

export const userState: UserState = {
  isAuthenticated: false,
  status: STATUS.IDLE,
  userDetails: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    login: (draft, action) => {
      draft.status = STATUS.RUNNING;
      draft.userDetails = action.payload;
    },
    loginSuccess: draft => {
      draft.isAuthenticated = true;
      draft.status = STATUS.READY;
    },
    logOut: draft => {
      draft.status = STATUS.RUNNING;
    },
    logOutSuccess: draft => {
      draft.isAuthenticated = false;
      draft.status = STATUS.IDLE;
      draft.userDetails=null;
    },
  },
});

export const { login, loginSuccess, logOut, logOutSuccess } = userSlice.actions;
export default userSlice.reducer;
