import { createSlice } from '@reduxjs/toolkit';

interface IAlert {
  showAlert: {
    showAlert: boolean;
    alertHeading: string;
    alertParagraph: string;
  };
}

const initialState: IAlert = {
  showAlert: {
    showAlert: false,
    alertHeading: '',
    alertParagraph: '',
  },
};

const alertSlice = createSlice({
  name: 'showAlert',
  initialState,
  reducers: {
    setShowAlert: (state, action) => {
      const { showAlert, alertHeading, alertParagraph } = action.payload;
      state.showAlert = { showAlert, alertHeading, alertParagraph };
    },
  },
});

export const { setShowAlert } = alertSlice.actions;
export const showAlertReducer = alertSlice.reducer;
