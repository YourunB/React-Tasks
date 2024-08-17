import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload;
    },

  },
});

export const { updateName } = dataSlice.actions;
export default dataSlice.reducer;
