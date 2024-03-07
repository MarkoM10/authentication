import { createSlice } from '@reduxjs/toolkit';

interface IFormData {
  stepOneData: {
    name: string;
    phoneNumber: string;
    address: string;
  };
  stepTwoData: any;
  stepThreeData: any;
}

const initialState: IFormData = {
  stepOneData: {
    name: '',
    phoneNumber: '',
    address: '',
  },
  stepTwoData: [],
  stepThreeData: [],
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
        stepTwoData: action.payload,
      };
    },
    updateStepThreeData: (state, action) => {
      return {
        ...state,
        stepThreeData: action.payload,
      };
    },
  },
});

export const { updateStepOneData, updateStepTwoData, updateStepThreeData } =
  formDataSlice.actions;
export const formDataReducer = formDataSlice.reducer;
