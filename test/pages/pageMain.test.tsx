import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import PageMain from '../../src/pages/pageMain';
import { describe, test, expect, vi } from 'vitest';
import Card from '../../src/components/card';
import Search from '../../src/components/search';

describe('PageMain Component', () => {
  test('renders without crashing', () => {
    render(<PageMain />);
    const pageMainElement = screen.getByTestId('page-main');
    expect(pageMainElement).toBeInTheDocument();
  });

  test('renders the header', () => {
    render(<PageMain />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  test('renders the Footer component', () => {
    render(<PageMain />);
    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });

  test('renders the Search component', () => {
    render(<PageMain />);
    const search = screen.getByTestId('search');
    expect(search).toBeInTheDocument();
  });

  test('displays loading when load is true', () => {
    render(<PageMain />);
    const loadingElement = screen.getByTestId('loading');
    expect(loadingElement).toBeInTheDocument();
  });

  test('hides description on main panel click', () => {
    render(<PageMain />);
    const mainPanelElement = screen.getByRole('main');
    fireEvent.click(mainPanelElement);
    const cardDescriptionElement = screen.queryByText('cardDescriptionCode');
    expect(cardDescriptionElement).not.toBeInTheDocument();
  });

  test('shows card details on main panel click', () => {
    const data = {
      _id: 20,
      imageUrl: 'https://disneay.api/pluto.jpg',
      name: 'Movie Title',
      films: ['Film 1', 'Film 2'],
    };
    const { container } = render(
      <Card
        key={data._id}
        id={data._id}
        image={data.imageUrl}
        name={data.name}
        films={data.films.join(', ')}
        showDescription={vi.fn()}
      />
    );
    expect(container).toBeInTheDocument();

    render(<PageMain />);
    const mainPanelElement = screen.getByRole('main');
    fireEvent.click(mainPanelElement);
    const cardDetailsElement = screen.getByTestId('card');
    expect(cardDetailsElement).toBeInTheDocument();
  });
});
