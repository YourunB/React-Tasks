import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../../src/modules/errorBoundary';
import React from 'react';
import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';

const ProblemChild = () => {
  throw new Error('Error thrown from problem child');
};

describe('ErrorBoundary', () => {
  test('renders children without error', () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  test('renders error message when child throws error', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(screen.getByText('Sorry, something went wrong...')).toBeInTheDocument();
  });
});