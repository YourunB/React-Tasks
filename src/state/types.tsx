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
  sourceUrl: string;
}

export interface Info {
  count: number;
  nextPage: string;
  previousPage: string | null;
  totalPages: number;
}

export interface CardCharacterProps {
  key: number;
  image: string;
  name: string;
  films: string;
  tvShows: string;
  games: string;
  source: string;
}

export interface PropsChildren {
  children: React.ReactNode;
}
