import { createSlice } from '@reduxjs/toolkit';

const initialState={
  page: 1,
  totalPages: 1,
  search: '',
  characters: {},
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

    updateCharacters: (state, action) => {
      state.characters = action.payload;
    },

  },
});

export const { updateTotalPages, updateCharacters, updatePage } = dataSlicePage.actions;
export default dataSlicePage.reducer;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const API_URL = 'https://api.disneyapi.dev/character';
export const apiSlicePage = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getCharactersApi: builder.query({
      query: (page: number) => `?page=${page}&pageSize=10`,
    }),
    searchCharactersApi: builder.query({
      query: ({search, page}) => `?name=${search}&pageSize=10&page=${page}`,
    }),
  }),
});
export const { useGetCharactersApiQuery, useSearchCharactersApiQuery } = apiSlicePage;