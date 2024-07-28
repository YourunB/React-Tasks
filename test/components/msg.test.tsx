import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import React from 'react';
import Msg from '../../src/components/msg';
import { vi, test, describe, expect } from 'vitest';

beforeAll(() => {
  global.URL.createObjectURL = vi.fn();
});

const mockStore = configureStore([]);
const initialState = {
  dataElements: {
    checkedCards: [
      { id: 0, name: '' },
      { id: 1, name: 'Name 1' },
      { id: 2, name: 'Name 2' },
      { id: 3, name: 'Name 3' },
    ],
  },
};

describe('Msg Component', () => {
  const store = mockStore(initialState);
  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <Router>
          <Msg />
        </Router>
      </Provider>
    );
  };

  test('should display the correct number of selected items', () => {
    renderComponent();

    expect(screen.getByText('Total selected: 3')).toBeInTheDocument();
  });

  test('should call clearAll when Reset button is clicked', () => {
    renderComponent();

    const btn = screen.getByText('Reset');
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
  });
});
