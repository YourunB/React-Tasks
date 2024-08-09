import { render } from '@testing-library/react';
import PageNotFound from '../../src/pages/404';
import { describe, test, expect } from 'vitest';

describe('PageNotFound', () => {
  test('renders without crashing', () => {
    render(<PageNotFound />);
  });

  test('displays the correct error message', () => {
    const { getByText } = render(<PageNotFound />);
    const errorMessage = getByText(/This Page Not Found/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('contains a link to the home page', () => {
    const { getByText } = render(<PageNotFound />);
    const homeLink = getByText(/HOME/i);
    expect(homeLink).toBeInTheDocument();
  });
});