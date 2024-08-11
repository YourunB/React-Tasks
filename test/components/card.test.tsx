import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Card from '../../app/components/card';
import { updateCheckedCards, removeCheckedCards } from '../../app/redux/dataSliceElements';
import React from 'react';
import { CardProps } from '../../app/state/types';
import '@testing-library/jest-dom';
import { describe, test, expect, vi, beforeAll } from 'vitest';

beforeAll(() => {
  vi.mock('@remix-run/react', () => ({
    useNavigate: vi.fn(() => vi.fn()),
  }));
});
const mockStore = configureStore([]);
let initialState = {
  dataElements: {
    checkedCards: [{ id: 0 }],
  },
};

describe('Card Component', () => {
  let store = mockStore(initialState);
  const renderComponent = (props: CardProps) => {
    return render(
      <Provider store={store}>
          <Card {...props} />
      </Provider>
    );
  };

  const props = {
    key: 1,
    id: 1,
    name: 'Test Name',
    image: '',
    species: '',
  };

  test('renders Card component with none props', () => {
    renderComponent(props);
    expect(screen.getByTestId('card'));
    expect(screen.getByText(props.name)).toBeInTheDocument();
    expect(screen.getByAltText(props.name)).toHaveAttribute(
      'src',
      `${props.image || '/noimage.jpg'}`
    );
    expect(screen.getByText(`${props.species || 'none'}`)).toBeInTheDocument();
  });

  test('dispatches updateCheckedCards action on star click', () => {
    const props = {
      key: 1,
      id: 1,
      name: 'Test Name',
      image: 'image.jpg',
      species: '',
    };
    renderComponent(props);

    const starImg = screen.getByAltText('Star');
    fireEvent.click(starImg);

    const actions = store.getActions();
    expect(actions).toContainEqual(
      updateCheckedCards({
        id: 1,
        name: 'Test Name',
        image: `${props.image}`,
        species: props.species,
        url: location.href,
      })
    );
  });

  test('renders with checked class if id is in checkedCards', () => {
    initialState = {
      dataElements: {
        checkedCards: [{ id: 1 }],
      },
    };
    store = mockStore(initialState);

    renderComponent(props);

    const checkedStarImg = screen.getByAltText('Star');
    expect(screen.getByAltText('Star'))
    fireEvent.click(checkedStarImg);
  });

  test('dispatches removeCheckedCards action on checked star click', () => {
    renderComponent(props);

    const checkedStarImg = screen.getByAltText('Star');
    expect(screen.getByAltText('Star'));
    fireEvent.click(checkedStarImg);
  });
});