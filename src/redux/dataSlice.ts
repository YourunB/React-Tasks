import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { updateUser } = dataSlice.actions;
export default dataSlice.reducer;
