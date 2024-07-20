import React from 'react';

export interface DisneyObject {
  data: [Character] | Character;
  info: Info;
}

export interface Character {
  _id: number;
  name: string;
  films: string[];
  tvShows: string[];
  videoGames: string[];
  imageUrl: string;
  showDescription: (value: number) => void;
}

export interface Info {
  count: number;
  nextPage: string;
  previousPage: string | null;
  totalPages: number;
}

export interface CardProps {
  key: number;
  id: number;
  image: string;
  name: string;
  films: string;
  showDescription: (value: number) => void;
}

export interface PropsChildren {
  children: React.ReactNode;
}

export interface PaginationProps {
  key: number;
  page: number;
  obj: object;
  changePage: (value: number) => void;
}

export interface CardListProps {
  key: number;
  cardCode: JSX.Element | null | object;
}

export interface SearchProps {
  key: number;
  serchInputRef: React.MutableRefObject<null>;
  search: string;
  clearSearch: () => void;
  changeSearchCharacters: () => void;
}

export interface CardDescriptionProps {
  key: number;
  image: string;
  name: string;
  films: string;
  tvShows: string;
  shortFilms: string;
  videoGames: string;
  hideDescription: () => void;
}
