import { createSlice } from '@reduxjs/toolkit';

const initialState={
  id: 10,
  details: {
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

    updateDetails: (state, action) => {
      state.details = action.payload;
    },

    updateId: (state, action) => {
      state.id = action.payload;
    }
  },
});

export const { updateDetails, updateId } = dataSliceCharacter.actions;

export default dataSliceCharacter.reducer;