import { describe, test, expect } from 'vitest';
import {
  DisneyObject,
  Character,
  Info,
  CardProps,
  PaginationProps,
  CardListProps,
  SearchProps,
  CardDescriptionProps,
} from '../../src/state/types';
import '@testing-library/jest-dom';

const character: Character = {
  _id: 1,
  name: 'Mickey Mouse',
  films: ['Fantasia'],
  tvShows: ['Mickey Mouse Clubhouse'],
  videoGames: ['Kingdom Hearts'],
  imageUrl: 'http://example.com/mickey.jpg',
  sourceUrl: 'http://example.com/mickey',
};

const info: Info = {
  count: 1,
  nextPage: 'http://disney.app/3',
  previousPage: null,
  totalPages: 1,
};

const disneyObject: DisneyObject = {
  data: character,
  info: info,
};

describe('DisneyObject', () => {
  test('should have correct data and info', () => {
    expect(disneyObject.data).toEqual(character);
    expect(disneyObject.info).toEqual(info);
  });
});

describe('CardProps', () => {
  const cardProps: CardProps = {
    key: 1,
    id: 1,
    image: 'http://example.com/mickey.jpg',
    name: 'Mickey Mouse',
    films: 'Fantasia',
    showDescription: (value: number) => {},
  };

  test('should have correct properties', () => {
    expect(cardProps.id).toBe(1);
    expect(cardProps.name).toBe('Mickey Mouse');
    expect(cardProps.films).toBe('Fantasia');
  });
});

describe('PaginationProps', () => {
  const paginationProps: PaginationProps = {
    key: 1,
    page: 1,
    obj: {},
    changePage: (value: number) => {},
  };

  it('should have correct properties', () => {
    expect(paginationProps.page).toBe(1);
  });
});

describe('CardListProps', () => {
  const cardListProps: CardListProps = {
    key: 1,
    cardCode: null,
    createError: () => {},
  };

  test('should have correct properties', () => {
    expect(cardListProps.cardCode).toBeNull();
  });
});

describe('SearchProps', () => {
  const searchProps: SearchProps = {
    key: 1,
    serchInputRef: { current: null },
    search: 'Mickey',
    clearSearch: () => {},
    changeSearchCharacters: () => {},
  };

  test('should have correct properties', () => {
    expect(searchProps.search).toBe('Mickey');
  });
});

describe('CardDescriptionProps', () => {
  const cardDescriptionProps: CardDescriptionProps = {
    key: 1,
    image: 'http://example.com/mickey.jpg',
    name: 'Mickey Mouse',
    films: 'Fantasia',
    tvShows: 'Mickey Mouse Clubhouse',
    shortFilms: 'Steamboat Willie',
    videoGames: 'Kingdom Hearts',
    hideDescription: () => {},
  };

  test('should have correct properties', () => {
    expect(cardDescriptionProps.name).toBe('Mickey Mouse');
  });
});
