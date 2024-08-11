import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { vi, test, describe, expect, beforeAll } from 'vitest';
import Pagination from '../../app/components/pagination';

beforeAll(() => {
  vi.mock('@remix-run/react', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useNavigate: vi.fn(() => vi.fn()),
      useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
    };
  });
});

beforeAll(() => {
  global.URL.createObjectURL = vi.fn();
});

const mockStore = configureStore([]);
const initialState = {
  dataPage: {
    page: 2,
    totalPages: 5,
    search: '',
    theme: { light: false },
  },
};

describe('Pagination component', () => {
  const store = mockStore(initialState);
  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );
  };

  test('renders correctly', () => {
    renderComponent();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /</ })).toBeEnabled();
    expect(screen.getByRole('button', { name: />/ })).toBeEnabled();
  });

  test('renders', () => {
    renderComponent();

    const btnPrev = screen.getByText('<');
    expect(btnPrev).toBeInTheDocument();
    fireEvent.click(btnPrev);

    const btnNext = screen.getByText('>');
    expect(btnNext).toBeInTheDocument();
    fireEvent.click(btnNext);
  });
});