import { configureStore } from '@reduxjs/toolkit';
import dataReducerPage from './dataSlicePage';
import dataSliceCharacter from './dataSliceCharacter';
import { apiSlicePage } from './dataSlicePage';

export const store = configureStore({
  reducer: {
    dataPage: dataReducerPage,
    [apiSlicePage.reducerPath]: apiSlicePage.reducer,
    dataCharacter: dataSliceCharacter
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlicePage.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;