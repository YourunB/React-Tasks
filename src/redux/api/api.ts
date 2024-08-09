import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getCharactersApi: builder.query({
      query: ({ page, search = '' }) => `?name=${search}&page=${page}`,
    }),
    getDetailsApi: builder.query({
      query: (id: number) => `/${id}`,
    }),
  }),
});

export const { useGetCharactersApiQuery, useGetDetailsApiQuery } = api;
