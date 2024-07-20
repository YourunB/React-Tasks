import { configureStore } from '@reduxjs/toolkit';
import dataReducerPage from './dataSlicePage';
import dataSliceCharacter from './dataSliceCharacter';
import { api } from './api/api';

export const store = configureStore({
  reducer: {
    dataPage: dataReducerPage,
    [api.reducerPath]: api.reducer,
    dataCharacter: dataSliceCharacter
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;