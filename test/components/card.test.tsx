import { vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../../src/components/card';
import '@testing-library/jest-dom';
import React from 'react';

describe('check Card', () => {
  const props = {
    key: 20,
    id: 20,
    name: 'Elena of Avalor',
    image: 'https://static.wikia.nocookie.net/disney/images/f/fa/Normal_EoA_S3_E4_0217.jpg',
    films: '',
    showDescription: vi.fn(),
  };

  test('renders Card component with props', () => {
    render(<Card {...props} />);
    const imgElement = screen.getByAltText('Elena of Avalor');
    const nameElement = screen.getByText('Elena of Avalor');
    const filmsElement = screen.getByText('none');
    expect(imgElement).toHaveAttribute(
      'src',
      'https://static.wikia.nocookie.net/disney/images/f/fa/Normal_EoA_S3_E4_0217.jpg'
    );
    expect(nameElement).toBeInTheDocument();
    expect(filmsElement).toBeInTheDocument();
  });

  it('calls showDescription when clicked', () => {
    const { container } = render(<Card {...props} />);
    const cardElement = container.querySelector('.card-char') as HTMLElement;
    fireEvent.click(cardElement);
    expect(props.showDescription).toHaveBeenCalledWith(20);
  });
});
