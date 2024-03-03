import { createSlice } from '@reduxjs/toolkit';

interface IConfirm {
  showConfirm: boolean;
}

const initialState: IConfirm = {
  showConfirm: false,
};

const confirmSlice = createSlice({
  name: 'confirm',
  initialState,
  reducers: {
    setShowConfirm: (state, action) => {
      state.showConfirm = action.payload;
    },
  },
});

export const { setShowConfirm } = confirmSlice.actions;
export const confirmReducer = confirmSlice.reducer;
