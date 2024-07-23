import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import React from 'react';
import { MemoryRouter, Routes, Route, BrowserRouter } from 'react-router-dom';
import { describe, test, expect } from 'vitest';
import PageMain from '../../src/pages/pageMain';
import { store } from '../../src/redux/store';
import ThemeContext from '../../src/components/themeContext';
import { vi } from 'vitest';
import Card from '../../src/components/card';
import { Character } from '../../src/state/types';

const theme = {
  light: true,
  change: vi.fn(),
};

const renderPage = () =>
  render(
    <Provider store={store}>
      <ThemeContext.Provider value={theme}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<PageMain />} />
          </Routes>
        </MemoryRouter>
      </ThemeContext.Provider>
    </Provider>
  );

describe('PageMain', () => {
  test('render light theme', () => {
    renderPage();

    const pageMainElement = screen.getByTestId('page-main');
    expect(pageMainElement).toBeInTheDocument();
    expect(pageMainElement).toHaveClass('light');
  });

  test('loading indicator', () => {
    vi.mock('./api', () => ({
      useGetCharactersApiQuery: () => ({
        isLoading: true,
        isFetching: true,
        data: null,
      }),
    }));

    renderPage();

    expect(screen.getByTestId('loading'));
  });

  test('change theme on click', () => {
    renderPage();

    const themeButton = screen.getByTestId('theme-button');
    fireEvent.click(themeButton);
    expect(theme.change).toBeCalled();
  });

  let cardCode: JSX.Element | null | object = null;
  const renderCard = () => render(
    <Provider store={store}>
      <BrowserRouter>
        <>{cardCode}</>
      </BrowserRouter>
    </Provider>
  );

  test('render two card', () => {
    const dataCharacters = {
      data: {
        data: [
          { _id: 1, imageUrl: 'url1', name: 'Character 1', films: ['Film 1']},
          { _id: 2, imageUrl: 'url2', name: 'Character 2', films: ['Film 2']},
        ],
      },
    };

    if (dataCharacters.data) {
      const data = Array.isArray(dataCharacters.data.data) ? dataCharacters.data.data : [dataCharacters.data.data];
      cardCode = data.map((character: Character) => (
        <Card
          key={character._id}
          id={character._id}
          image={character.imageUrl}
          name={character.name}
          films={character.films.join(', ')}
        />
      ));
    }

    renderCard();
    expect(screen.getByText('Character 2')).toBeInTheDocument();
  });

  test('render single card', () => {
    const dataCharacters = {
      data: {
        data: { _id: 1, imageUrl: 'url1', name: 'Character 1', films: ['Film 1'] },
      },
    };

    if (dataCharacters.data) {
      const data = Array.isArray(dataCharacters.data.data) ? dataCharacters.data.data : [dataCharacters.data.data];
      cardCode = data.map((character: Character) => (
        <Card
          key={character._id}
          id={character._id}
          image={character.imageUrl}
          name={character.name}
          films={character.films.join(', ')}
        />
      ));
    }

    renderCard();
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });
});
