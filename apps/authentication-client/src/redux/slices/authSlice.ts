import { createSlice } from '@reduxjs/toolkit';

interface IAuth {
  auth: boolean;
}

const initialState: IAuth = {
  auth: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;

export const authReducer = authSlice.reducer;
