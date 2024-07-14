import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Footer from '../../src/components/footer';
import React from "react";
import '@testing-library/jest-dom';

describe('Footer Component', () => {
  test('renders current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(`© ${year}`)).toBeInTheDocument();
  });

  test('renders author link', () => {
    render(<Footer />);
    const linkElement = screen.getByText('Yury Butskevich');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://github.com/YourunB');
  });
});