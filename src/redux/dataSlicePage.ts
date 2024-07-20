import { createSlice } from '@reduxjs/toolkit';

const initialState={
  load: true,
  page: 1,
  search: '',
  characters: {},
}

export const dataSlicePage = createSlice({
  name: 'data',
  initialState,
  reducers: {

    updateLoad: (state, action) => {
      state.load = action.payload;
    },

    updateCharacters: (state, action) => {
      state.characters = action.payload;
    },

  },
});

export const { updateLoad, updateCharacters } = dataSlicePage.actions;

export default dataSlicePage.reducer;