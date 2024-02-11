import { configureStore } from '@reduxjs/toolkit';
import { showLoginReducer } from './slices';

const store = configureStore({
  reducer: {
    showLogin: showLoginReducer,
    // other reducers...
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
