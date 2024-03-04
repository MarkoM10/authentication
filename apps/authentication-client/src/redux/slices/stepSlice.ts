import { createSlice } from '@reduxjs/toolkit';

interface IStep {
  step: number;
}

const initialState: IStep = {
  step: 2,
};

export const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    incrementStep: (state) => {
      state.step += 1;
    },
    decrementStep: (state) => {
      state.step -= 1;
    },
  },
});

export const { incrementStep, decrementStep } = stepSlice.actions;
export const stepReducer = stepSlice.reducer;
