import { createSlice } from '@reduxjs/toolkit';

const initialState={
  page: 1,
  totalPages: 1,
  search: '',
  characters: {},
  theme: 'light',
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

    updateCharacters: (state, action) => {
      state.characters = action.payload;
    },

    updateTheme: (state, action) => {
      state.theme = action.payload;
    },

  },
});

export const { updateTotalPages, updateSearch, updatePage, updateCharacters, updateTheme } = dataSlicePage.actions;
export default dataSlicePage.reducer;