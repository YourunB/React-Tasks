import { render } from '@testing-library/react';
import Footer from '../../app/components/footer';
import { expect, test } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders footer link', () => {
  const { getByTestId } = render(
    <Router>
      <Footer />
    </Router>
  );
  const footerLink = getByTestId('footer');
  expect(footerLink).toBeInTheDocument();
  expect(footerLink).toHaveAttribute('href', 'https://github.com/YourunB');
});