import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import PageNotFound from '../../src/pages/pageNotFound';
import { describe, test, expect } from 'vitest';
import ThemeContext from '../../src/components/themeContext';

describe('PageNotFound', () => {
  it('render light theme', () => {
    const theme = {
      light: true,
      change: () => {},
    };

    render(
      <ThemeContext.Provider value={theme}>
        <PageNotFound />
      </ThemeContext.Provider>
    );

    const pageNotFoundElement = screen.getByTestId('page-not-found');
    expect(pageNotFoundElement).toBeInTheDocument();
    expect(pageNotFoundElement).toHaveClass('page-not-found_light');
  });

  it('render dark theme', () => {
    const theme = {
      light: false,
      change: () => {},
    };

    render(
      <ThemeContext.Provider value={theme}>
        <PageNotFound />
      </ThemeContext.Provider>
    );

    const pageNotFoundElement = screen.getByTestId('page-not-found');
    expect(pageNotFoundElement).toBeInTheDocument();
    expect(pageNotFoundElement).not.toHaveClass('page-not-found_light');
  });

  it('render content', () => {
    const theme = {
      light: true,
      change: () => {},
    };

    render(
      <ThemeContext.Provider value={theme}>
        <PageNotFound />
      </ThemeContext.Provider>
    );

    expect(screen.getByAltText('Earth')).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('This Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('HOME')).toBeInTheDocument();
  });
});
