import { render } from '@testing-library/react';
import Loading from '../../../../src/app/components/loading';
import { test, expect } from 'vitest';

test('renders loading component', () => {
  const { getByTestId } = render(<Loading />);
  const loadingElement = getByTestId('loading');
  expect(loadingElement).toBeInTheDocument();
});