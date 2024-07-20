import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../../src/components/card';
import '@testing-library/jest-dom';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

describe('check Card', () => {
  const props = {
    key: 20,
    id: 20,
    image: 'https://static.wikia.nocookie.net/disney/images/f/fa/Normal_EoA_S3_E4_0217.jpg',
    name: 'Elena of Avalor',
    films: '',
  };

  test('renders Card component with props', () => {
    render(<MemoryRouter><Card {...props} /></MemoryRouter>);
    const imgElement = screen.getByAltText('Elena of Avalor');
    const nameElement = screen.getByText('Elena of Avalor');
    const filmsElement = screen.getByText(`${props.films || 'none'}`);
    expect(imgElement).toHaveAttribute(
      'src',
      'https://static.wikia.nocookie.net/disney/images/f/fa/Normal_EoA_S3_E4_0217.jpg'
    );
    expect(imgElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(filmsElement).toBeInTheDocument();
  });
});
