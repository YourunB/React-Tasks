
import { configureStore } from '@reduxjs/toolkit';
import dataReducerPage from './dataSlicePage';
import dataReducerCharacter from './dataSliceCharacter';

export const store = configureStore({
  reducer: {
    dataPage: dataReducerPage,
    dataCharacter: dataReducerCharacter,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch