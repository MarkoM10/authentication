import { configureStore } from '@reduxjs/toolkit';
import { showLoginReducer } from './slices/loginSlice';
import { showSpinnerReducer } from './slices/spinnerSlice';
import { showAlertReducer } from './slices/alertSlice';
import { stepReducer } from './slices/stepSlice';

const store = configureStore({
  reducer: {
    showLogin: showLoginReducer,
    showSpinner: showSpinnerReducer,
    showAlert: showAlertReducer,
    step: stepReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
