import { vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from '../../src/components/card';
import '@testing-library/jest-dom';
import React from "react";

describe('check Card', () => {
  test('renders Card component with props', () => {
    const props = {
      key: 20,
      id: 20,
      name: 'Elena of Avalor',
      image: 'https://static.wikia.nocookie.net/disney/images/f/fa/Normal_EoA_S3_E4_0217.jpg',
      films: '',
      showDescription: vi.fn(),
      };

    render(<Card {...props} />);

    const imgElement = screen.getByAltText('Elena of Avalor');
    const nameElement = screen.getByText('Elena of Avalor');
    const filmsElement = screen.getByText('none');

    expect(imgElement).toHaveAttribute('src', 'https://static.wikia.nocookie.net/disney/images/f/fa/Normal_EoA_S3_E4_0217.jpg');
    expect(nameElement).toBeInTheDocument();
    expect(filmsElement).toBeInTheDocument();
  });
});
