import '@testing-library/jest-dom';
import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import CardDescription from '../../src/components/cardDescription';
import { dataSliceCharacter } from '../../src/redux/dataSliceCharacter';
import { api } from '../../src/redux/api/api';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { describe, test, beforeAll, vi } from 'vitest';

beforeAll(() => {
  vi.mock("next/router", () => require("next-router-mock"));
})

const renderWithProviders = (ui: ReactNode, route: string) => {
  const store = configureStore({
    reducer: {
      dataCharacter: dataSliceCharacter.reducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  });

  setupListeners(store.dispatch);

  return render(
    <Provider store={store}>
      <CardDescription />
    </Provider>
  );
};

describe('CardDescription', () => {
  test('renders correctly with data', async () => {
    renderWithProviders(<CardDescription />, '/?page=1&details=1');
  });
});
