import { createSlice } from '@reduxjs/toolkit';

interface IToken {
  token: string;
}

const initialState: IToken = {
  token: '',
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export const tokenReducer = tokenSlice.reducer;
