import '@testing-library/jest-dom';
import React, { ReactNode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import CardDescription from '../../src/components/cardDescription';
import { dataSliceCharacter } from '../../src/redux/dataSliceCharacter';
import { api } from '../../src/redux/api/api';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, test, expect } from 'vitest';

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
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/details/:id" element={ui} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('CardDescription', () => {
  test('renders correctly with data', async () => {
    renderWithProviders(<CardDescription />, '/details/10');

    expect(await screen.findByTestId('card-details')).toBeInTheDocument();
    expect(await screen.findByText('627')).toBeInTheDocument();
    expect(await screen.findByText(`Films:`)).toBeInTheDocument();
    expect(await screen.findByText(`TV Shows: Lilo & Stitch: The Series, Stitch!`)).toBeInTheDocument();
    expect(await screen.findByText('Short Films:')).toBeInTheDocument();
    expect(await screen.findByText('Video Games: Disney Tsum Tsum (game)')).toBeInTheDocument();
    expect(await screen.findByAltText('Character')).toHaveAttribute(
      'src',
      'https://static.wikia.nocookie.net/disney/images/8/80/Profile_-_627.png'
    );
  });

  test('closes details on button click', async () => {
    renderWithProviders(<CardDescription />, '/details/10');

    const btn = await screen.findByText('X');
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(location.pathname === '/');
  });

  test('closes details on display click', async () => {
    renderWithProviders(<CardDescription />, '/details/10');

    const overflow = await screen.findByTestId('card-details');
    expect(overflow).toBeInTheDocument();
    fireEvent.click(overflow);
    expect(location.pathname === '/');
  });
});
