import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../src/App';
import ErrorBoundary from '../src/modules/errorBoundary';

describe('main file', () => {
  test('render main', () => {
    render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );

    expect(screen.getByText('Disney Characters')).toBeInTheDocument();
  });
});
