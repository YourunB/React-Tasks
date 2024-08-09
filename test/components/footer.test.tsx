import { render } from '@testing-library/react';
import Footer from '../../src/components/footer';
import { expect, test } from 'vitest';

test('renders footer link', () => {
  const { getByTestId } = render(<Footer />);
  const footerLink = getByTestId('footer');
  expect(footerLink).toBeInTheDocument();
  expect(footerLink).toHaveAttribute('href', 'https://github.com/YourunB');
});