import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import React from 'react';
import { describe, test, expect, vi, beforeAll } from 'vitest';
import PageMain from '../../src/components/pageMain';
import { store } from '../../src/redux/store';
import ThemeContext from '../../src/components/themeContext';
import Card from '../../src/components/card';
import { Character } from '../../src/state/types';
import { updateId } from '@/redux/dataSliceCharacter';
import Image from 'next/image';

beforeAll(() => {
  vi.mock("next/router", () => require("next-router-mock"));
})

const theme = {
  light: true,
  change: vi.fn(),
};

const renderPage = () =>
  render(
    <Provider store={store}>
      <ThemeContext.Provider value={theme}>
        <PageMain />
      </ThemeContext.Provider>
    </Provider>
  );

describe('PageMain', () => {
  test('render light theme', () => {
    renderPage();

    const pageMainElement = screen.getByTestId('page-main');
    expect(pageMainElement).toBeInTheDocument();
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
  const renderCard = () =>
    render(
      <Provider store={store}>
          <>{cardCode}</>
      </Provider>
    );

  test('render two card', () => {
    const dataCharacters = {
      data: {
        data: [
          { id: 1, image: 'url1', name: 'Character 1', species: 'Film 1' },
          { id: 2, image: 'url2', name: 'Character 2', species: 'Film 2' },
        ],
      },
    };

    if (dataCharacters.data) {
      const data = Array.isArray(dataCharacters.data.data) ? dataCharacters.data.data : [dataCharacters.data.data];
      cardCode = data.map((character: Character) => (
        <Card
          key={character.id}
          id={character.id}
          image={character.image}
          name={character.name}
          species={character.species}
        />
      ));
    }

    renderCard();
    expect(screen.getByText('Character 2')).toBeInTheDocument();
  });

  test('render single card', () => {
    const dataCharacters = {
      data: {
        data: { id: 1, image: 'url1', name: 'Character 1', species: 'Film 1' },
      },
    };

    if (dataCharacters.data) {
      const data = Array.isArray(dataCharacters.data.data) ? dataCharacters.data.data : [dataCharacters.data.data];
      cardCode = data.map((character: Character) => (
        <Card
          key={character.id}
          id={character.id}
          image={character.image}
          name={character.name}
          species={character.species}
        />
      ));
    }

    renderCard();
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });

});
