import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import '@testing-library/jest-dom';
import { test, expect } from 'vitest';

test('App component', () => {
  render(<App />);
  const app = screen.getByTestId('App');
  expect(app).toBeInTheDocument();
});
