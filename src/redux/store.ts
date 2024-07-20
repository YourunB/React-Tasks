import { configureStore } from '@reduxjs/toolkit';
import dataCharacterReducer from './dataSliceCharacter';
import dataPageReducer from './dataSlicePage';

export const store = configureStore({
  reducer: {
    dataPage: dataCharacterReducer,
    dataCharacter: dataPageReducer,
  },
})