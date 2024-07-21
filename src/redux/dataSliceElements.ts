import { createSlice } from '@reduxjs/toolkit';

const initialState={
  checkedCards: [{
    id: null,
    name: '',
    image: '',
    films: '',
    url: '',
  }],
}

export const dataSliceElements = createSlice({
  name: 'data',
  initialState,
  reducers: {

    updateCheckedCards: (state, action) => {
      const arr = state.checkedCards;
      let save = true;
      for (let i = 0; i < arr.length; i += 1) {
        if (arr[i].id === action.payload.id) save = false;
      }
      if (save) state.checkedCards.push(action.payload);
    },

    removeCheckedCards: (state, action) => {
      const arr = state.checkedCards.filter((v) => v.id !== action.payload);
      state.checkedCards = arr;
    },

    clearAll: (state) => {
      state.checkedCards = [{ id: null, name: '', image: '', films: '', url: '', }];
    },

  },
});

export const { updateCheckedCards, removeCheckedCards, clearAll } = dataSliceElements.actions;

export default dataSliceElements.reducer;