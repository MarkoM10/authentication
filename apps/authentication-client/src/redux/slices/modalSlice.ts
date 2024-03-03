import { createSlice } from '@reduxjs/toolkit';

interface IModal {
  showModal: boolean;
}

const initialState: IModal = {
  showModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

export const { setShowModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
