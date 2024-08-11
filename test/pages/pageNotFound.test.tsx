import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import PageNotFound from '../../app/pages/pageNotFound';
import { describe, test, expect } from 'vitest';

describe('PageNotFound', () => {
  test('renders without crashing', () => {
    render(
      <Router>
        <PageNotFound />
      </Router>
    );
  });

  test('displays the correct error message', () => {
    const { getByText } = render(
      <Router>
        <PageNotFound />
      </Router>
    );
    const errorMessage = getByText(/This Page Not Found/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('contains a link to the home page', () => {
    const { getByText } = render(
      <Router>
        <PageNotFound />
      </Router>
    );
    const homeLink = getByText(/HOME/i);
    expect(homeLink).toBeInTheDocument();
  });
});