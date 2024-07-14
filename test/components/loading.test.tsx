import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Loading from '../../src/components/loading';
import React from "react";
import '@testing-library/jest-dom';

describe('Loading Component', () => {
  test('renders loading image', () => {
    render(<Loading />);
    const imgElement = screen.getByAltText('Loading');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', expect.stringContaining('loading.gif'));
  });

  test('has correct class name for styling', () => {
    render(<Loading />);
    const divElement = screen.getByRole('img').parentElement;
    expect(divElement).toHaveClass('loading');
  });
});