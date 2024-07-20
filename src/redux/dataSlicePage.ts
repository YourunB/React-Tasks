import { createSlice } from '@reduxjs/toolkit';

const initialState={
  load: true,
  updateCards: true,
  page: 1,
}

export const dataSlicePage = createSlice({
  name: 'data',
  initialState,
  reducers: {

    updatePage: (state, action) => {

    },

  },
});

export const { updatePage } = dataSlicePage.actions;

export default dataSlicePage.reducer;