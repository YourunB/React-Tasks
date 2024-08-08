import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
  totalPages: 1,
  search: '',
  theme: { light: false },
};

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

    updateTheme: (state, action) => {
      state.theme = { light: action.payload };
    },
  },
});

export const { updateTotalPages, updateSearch, updatePage, updateTheme } = dataSlicePage.actions;
export default dataSlicePage.reducer;
