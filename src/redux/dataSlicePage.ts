import { createSlice } from '@reduxjs/toolkit';

const initialState={
  page: 1,
  totalPages: 1,
  search: '',
}

export const dataSlicePage = createSlice({
  name: 'data',
  initialState,
  reducers: {

    updatePage: (state, action) => {
      state.page = action.payload;
    },

    updateTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },

    updateSearch: (state, action) => {
      state.search = action.payload;
    },

  },
});

export const { updateTotalPages, updateSearch, updatePage } = dataSlicePage.actions;
export default dataSlicePage.reducer;