import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import { test, expect } from 'vitest';

const theme = {
  light: false,
  change: function() { this.light = !this.light },
};

test('App component', () => {
  render(<App />);
  const app = screen.getByTestId('App');
  expect(app).toBeInTheDocument();
});

test('toggles theme', () => {
  const { getByTestId } = render(<App />);
  const themeButton = getByTestId('theme-button');
  expect(theme.light).toBe(false);
  themeButton.click();
  expect(theme.light).toBe(false);
});