import { createSlice } from '@reduxjs/toolkit';

interface IShowLogin {
  showLogin: boolean;
}

const initialState: IShowLogin = {
  showLogin: false,
};

export const showLoginSlice = createSlice({
  name: 'showLogin',
  initialState,
  reducers: {
    setShowLogin: (state, action) => {
      state.showLogin = action.payload;
    },
  },
});

export const { setShowLogin } = showLoginSlice.actions;
export const showLoginReducer = showLoginSlice.reducer;
