export interface DisneyObject {
  data: [Character] | Character;
  info: Info;
}

export interface Character {
  id: number;
  name: string;
  species: string;
  image: string;
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
  species: string;
}

export interface PropsChildren {
  children: React.ReactNode;
}

export interface CardListProps {
  key: number;
  cardCode: JSX.Element | null | object;
}
