import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'https://api.disneyapi.dev/character';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getCharactersApi: builder.query({
      query: ({page, search = ''}) => `?name=${search}&pageSize=10&page=${page}`,
    }),
    getDetailsApi: builder.query({
      query: (id: number) => `/${id}`,
    }),
  }),
});

export const { useGetCharactersApiQuery, useGetDetailsApiQuery } = api;