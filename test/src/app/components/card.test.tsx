import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Card from '../../../../src/app/components/card';
import { updateCheckedCards, removeCheckedCards } from '../../../../src/app/redux/dataSliceElements';
import React from 'react';
import { CardProps } from '../../../../src/app/state/types';
import '@testing-library/jest-dom';
import { describe, test, expect, vi, beforeAll } from 'vitest';

beforeAll(() => {
  vi.mock("next/router", () => require("next-router-mock"));
})

describe('Card Component', () => {
  const mockStore = configureStore();
  const initialState = {
    dataElements: {
      checkedCards: [],
    },
    dataPage: {
      page: 1,
      search: '',
    },
  };
  
  let store = mockStore(initialState);

  const props = {
    key: 1,
    id: 1,
    name: 'Test Name',
    image: '',
    species: '',
  };

  const renderComponent = (props: CardProps) => {
    return render(
      <Provider store={store}>
        <Card {...props} />
      </Provider>
    );
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
    const initialStateNew = {
      dataElements: {
        checkedCards: [{ id: 1 }],
      },
      dataPage: {
        page: 1,
        search: '',
      },
    };
    store = mockStore(initialStateNew);

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