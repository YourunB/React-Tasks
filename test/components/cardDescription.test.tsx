import { render, screen, fireEvent } from '@testing-library/react';
import { vi, expect } from 'vitest';
import '@testing-library/jest-dom';
import React from 'react';
import CardDescription from '../../src/components/cardDescription';
import { CardDescriptionProps } from '../../src/state/types';

describe('check CardDescription', () => {
  const mockProps: CardDescriptionProps = {
    key: 20,
    hideDescription: vi.fn(),
    image: 'https://static.wikia.nocookie.net/disney/images/f/fa/Normal_EoA_S3_E4_0217.jpg',
    name: 'Queen Abigail',
    films: '',
    tvShows: 'Elena of Avalor',
    shortFilms: '',
    videoGames: '',
  };

  test('renders CardDescription with props', () => {
    render(<CardDescription {...mockProps} />);

    expect(screen.getByAltText('Character')).toHaveAttribute('src', mockProps.image);
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByText(`Films: ${mockProps.films || 'none'}`)).toBeInTheDocument();
    expect(screen.getByText(`TV Shows: ${mockProps.tvShows || 'none'}`)).toBeInTheDocument();
    expect(screen.getByText(`Short Films: ${mockProps.shortFilms || 'none'}`)).toBeInTheDocument();
    expect(screen.getByText(`Video Games: ${mockProps.videoGames || 'none'}`)).toBeInTheDocument();
  });

  test('calls hideDescription on button click', () => {
    render(<CardDescription {...mockProps} />);

    fireEvent.click(screen.getByText('X'));
    expect(mockProps.hideDescription).toHaveBeenCalled();
  });

  test('renders default image when no image is provided', () => {
    const propsWithoutImage = { ...mockProps, image: '' };
    render(<CardDescription {...propsWithoutImage} />);

    expect(screen.getByAltText('Character')).toHaveAttribute(
      'src',
      'https://github.com/YourunB/Test1/blob/main/images/noimage.jpg?raw=true'
    );
  });
});
