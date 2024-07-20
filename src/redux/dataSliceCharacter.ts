import { createSlice } from '@reduxjs/toolkit';

const initialState={
  chartacterDescription: {
    data: {
      imageUrl: '',
      name: '',
      sourceUrl: '',
      films: [''],
      tvShows: [''],
      shortFilms: [''],
      videoGames: [''],
    },
  }
}

export const dataSliceCharacter = createSlice({
  name: 'data',
  initialState,
  reducers: {

    updateCharacter: (state, action) => {

    },

  },
});

export const { updateCharacter } = dataSliceCharacter.actions;

export default dataSliceCharacter.reducer;