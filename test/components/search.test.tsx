import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import React from 'react';
import { vi, test, describe, expect } from 'vitest';
import Search from '../../src/components/search';

beforeAll(() => {
  global.URL.createObjectURL = vi.fn();
});

const mockStore = configureStore([]);
const initialState = {
  dataPage: {
    page: 1,
    totalPages: 3,
    search: 'cat',
    theme: { light: false },
  },
};

describe('Search component', () => {
  const store = mockStore(initialState);
  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>
    );
  };

  test('should render search input and buttons', () => {
    renderComponent();
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('X')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('should clear search input when clear button is clicked', () => {
    renderComponent();
    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    const clearButton = screen.getByText('X');

    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');

    fireEvent.click(clearButton);
    expect(input.value).toBe('');
  });

  test('should dispatch actions when click btns', () => {
    renderComponent();

    const btnClose = screen.getByText('X');
    expect(btnClose).toBeInTheDocument();
    fireEvent.click(btnClose);
    
    const btnSearch = screen.getByText('Search');
    expect(btnSearch).toBeInTheDocument();
    fireEvent.click(btnSearch);
  });
});
