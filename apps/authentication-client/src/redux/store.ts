import { configureStore } from '@reduxjs/toolkit';
import { showLoginReducer } from './slices/loginSlice';
import { showSpinnerReducer } from './slices/spinnerSlice';
import { showAlertReducer } from './slices/alertSlice';
import { stepReducer } from './slices/stepSlice';
import { modalReducer } from './slices/modalSlice';
import { confirmReducer } from './slices/confirmationSlice';
import { formDataReducer } from './slices/formDataSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

const formDataPersistConfig = {
  key: 'formData',
  storage: storageSession,
};

const persistedFormDataReducer = persistReducer(
  formDataPersistConfig,
  formDataReducer
);

const store = configureStore({
  reducer: {
    showLogin: showLoginReducer,
    showSpinner: showSpinnerReducer,
    showAlert: showAlertReducer,
    step: stepReducer,
    modal: modalReducer,
    confirm: confirmReducer,
    formData: persistedFormDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
