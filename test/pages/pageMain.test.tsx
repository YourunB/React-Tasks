import { render, screen, fireEvent } from '@testing-library/react';
import React from "react";
import '@testing-library/jest-dom';
import PageMain from '../../src/pages/pageMain';
import { describe, test, expect } from 'vitest';

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
});
