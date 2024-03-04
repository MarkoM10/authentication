import { createSlice } from '@reduxjs/toolkit';

interface IFormData {
  stepOneData: {
    name: string;
    phoneNumber: string;
    address: string;
  };
  stepTwoData: {
    plan: string;
    starterPlanPrice: string;
    advancedPlanPrice: string;
    proPlanPrice: string;
    freeMonths: string;
    subscription: string;
  };
}

const initialState: IFormData = {
  stepOneData: {
    name: '',
    phoneNumber: '',
    address: '',
  },
  stepTwoData: {
    plan: '',
    starterPlanPrice: '29$',
    advancedPlanPrice: '59$',
    proPlanPrice: '109$',
    freeMonths: '',
    subscription: 'monthly',
  },
};

export const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    updateStepOneData: (state, action) => {
      return {
        ...state,
        stepOneData: {
          ...state.stepOneData,
          ...action.payload,
        },
      };
    },
    updateStepTwoData: (state, action) => {
      return {
        ...state,
        stepTwoData: {
          ...state.stepTwoData,
          ...action.payload,
        },
      };
    },
  },
});

export const { updateStepOneData, updateStepTwoData } = formDataSlice.actions;
export const formDataReducer = formDataSlice.reducer;
