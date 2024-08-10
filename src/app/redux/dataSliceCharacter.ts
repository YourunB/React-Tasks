import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 0,
  details: {},
};

export const dataSliceCharacter = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updateDetails: (state, action) => {
      state.details = action.payload;
    },

    updateId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { updateDetails, updateId } = dataSliceCharacter.actions;

export default dataSliceCharacter.reducer;
