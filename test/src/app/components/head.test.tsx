import { render } from '@testing-library/react';
import Head from '../../../../src/app/components/head';
import { test, expect, describe } from 'vitest';

describe('Head', () => {
  test('renders correctly', () => {
    const { container } = render(<Head />);
    const linkElement = container.querySelector('link[rel="icon"]');
    const titleElement = container.querySelector('title');

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/favicon.svg');
    expect(linkElement).toHaveAttribute('type', 'image/svg+xml');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Rick and Morty');
  });
});