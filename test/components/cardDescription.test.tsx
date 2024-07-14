import { render, screen, fireEvent } from "@testing-library/react";
import { vi, expect } from "vitest";
import '@testing-library/jest-dom';
import React from "react";
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
    videoGames: ''
  };

  test('renders CardDescription with props', () => {
    render(<CardDescription {...mockProps} />);
    
    expect(screen.getByAltText('Character')).toHaveAttribute('src', mockProps.image);
    expect(screen.getByText('Elena of Avalor')).toBeInTheDocument();
    expect(screen.getByText('')).toHaveTextContent('Films: none');
    expect(screen.getByText('Elena of Avalor')).toHaveTextContent('TV Shows: Elena of Avalor');
    expect(screen.getByText('')).toHaveTextContent('Short Films: none');
    expect(screen.getByText('')).toHaveTextContent('Video Games: none');
  });

  test('calls hideDescription on button click', () => {
    render(<CardDescription {...mockProps} />);
    
    fireEvent.click(screen.getByText('X'));
    expect(mockProps.hideDescription).toHaveBeenCalled();
  });

  test('renders default image when no image is provided', () => {
    const propsWithoutImage = { ...mockProps, image: '' };
    render(<CardDescription {...propsWithoutImage} />);
    
    expect(screen.getByAltText('Character')).toHaveAttribute('src', 'https://github.com/YourunB/Test1/blob/main/images/noimage.jpg?raw=true');
  });

  test('renders default text when no films, tvShows, shortFilms, or videoGames are provided', () => {
    const propsWithDefaults = { ...mockProps, films: '', tvShows: 'Elena of Avalor', shortFilms: '', videoGames: '' };
    render(<CardDescription {...propsWithDefaults} />);
    
    expect(screen.getByText('')).toHaveTextContent('Films: none');
    expect(screen.getByText('Elena of Avalor')).toHaveTextContent('TV Shows: none');
    expect(screen.getByText('')).toHaveTextContent('Short Films: none');
    expect(screen.getByText('')).toHaveTextContent('Video Games: none');
  });
});