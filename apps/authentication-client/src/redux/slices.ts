import { createSlice } from '@reduxjs/toolkit';

export const showLogin = createSlice({
  name: 'showLogin',
  initialState: {
    showLogin: false,
  },
  reducers: {
    setShowLogin: (state, action) => {
      state.showLogin = action.payload;
    },
  },
});

export const { setShowLogin } = showLogin.actions;

export const showLoginReducer = showLogin.reducer;
