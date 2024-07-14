import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, test, expect } from 'vitest';
import { PagesRouter } from '../../src/modules/pagesRouter';
import React from "react";
import '@testing-library/jest-dom';

describe('PagesRouter', () => {
  test('renders PageMain component for the root path', () => {
    render(
      <BrowserRouter>
        <PagesRouter />
      </BrowserRouter>
    );
    expect(screen.getByTestId('page-main' || 'page-not-found')).toBeInTheDocument();
  });
});