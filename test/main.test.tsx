import React from 'react';
import { render, screen } from '@testing-library/react';
import ReactDOM from '../src/App';
import '@testing-library/jest-dom';

test('main file', () => {
  render(<ReactDOM />);
  const app = screen.getByTestId('App');
  expect(app).toBeInTheDocument();
});
