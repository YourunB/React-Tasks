export interface DisneyObject {
  data: [Character] | Character;
  info: Info;
}

export interface Character {
  _id: number;
  name: string;
  films: string[];
  imageUrl: string;
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
}

export interface PropsChildren {
  children: React.ReactNode;
}

export interface CardListProps {
  key: number;
  cardCode: JSX.Element | null | object;
}
