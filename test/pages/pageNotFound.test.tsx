import { render, screen } from '@testing-library/react';
import React from "react";
import '@testing-library/jest-dom';
import PageNotFound from '../../src/pages/pageNotFound';

describe('PageNotFound Component', () => {
  test('renders without crashing', () => {
    render(<PageNotFound />);
    const pageNotFoundElement = screen.getByTestId('page-not-found');
    expect(pageNotFoundElement).toBeInTheDocument();
  });

  test('correct title', () => {
    render(<PageNotFound />);
    const titleElement = screen.getByText('404');
    expect(titleElement).toBeInTheDocument();
  });

  test('correct description', () => {
    render(<PageNotFound />);
    const descriptionElement = screen.getByText('This Page Not Found');
    expect(descriptionElement).toBeInTheDocument();
  });

  test('home link', () => {
    render(<PageNotFound />);
    const linkElement = screen.getByText('HOME');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', './');
  });

  test('image with correct alt text', () => {
    render(<PageNotFound />);
    const imgElement = screen.getByAltText('Earth');
    expect(imgElement).toBeInTheDocument();
  });
});
