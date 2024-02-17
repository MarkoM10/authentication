import { createSlice } from '@reduxjs/toolkit';

interface ISpinner {
  showSpinner: boolean;
}

const initialState: ISpinner = {
  showSpinner: false,
};

export const showSpinnerSlice = createSlice({
  name: 'showSpinner',
  initialState,
  reducers: {
    setShowSpinner: (state, action) => {
      state.showSpinner = action.payload;
    },
  },
});

export const { setShowSpinner } = showSpinnerSlice.actions;
export const showSpinnerReducer = showSpinnerSlice.reducer;
