import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Card from '../../src/components/card';
import { updateCheckedCards, removeCheckedCards } from '../../src/redux/dataSliceElements';
import React from 'react';
import { CardProps } from '../../src/state/types';

const mockStore = configureStore([]);
let initialState = {
  dataElements: {
    checkedCards: [{id: 0}],
  },
};

describe('Card Component', () => {
  let store = mockStore(initialState);
  const renderComponent = (props: CardProps) => {
    return render(
      <Provider store={store}>
        <Router>
          <Card {...props} />
        </Router>
      </Provider>
    );
  };

  const props = {
    key: 1,
    id: 1,
    name: 'Test Name',
    image: '',
    films: '',
  };

  test('renders Card component with none props', () => {
    renderComponent(props);
    expect(screen.getByTestId('card'));
    expect(screen.getByText(props.name)).toBeInTheDocument();
    expect(screen.getByAltText(props.name)).toHaveAttribute('src', `${props.image || 'https://github.com/YourunB/Test1/blob/main/images/noimage.jpg?raw=true'}`);
    expect(screen.getByText(`${props.films || 'none'}`)).toBeInTheDocument();
  });

  test('dispatches updateCheckedCards action on star click', () => {
    const props = {
      key: 1,
      id: 1,
      name: 'Test Name',
      image: 'image.jpg',
      films: '',
    };
    renderComponent(props);

    const starImg = screen.getByAltText('Star');
    fireEvent.click(starImg);

    const actions = store.getActions();
    expect(actions).toContainEqual(updateCheckedCards({
      id: 1,
      name: 'Test Name',
      image: `${props.image}`,
      films: `${props.films || 'none'}`,
      url: location.href,
    }));
  });

  test('renders with checked class if id is in checkedCards', () => {
    initialState = {
      dataElements: {
        checkedCards: [{id: 1}],
      },
    };
    store = mockStore(initialState);

    renderComponent(props);

    const imgElement = screen.getByAltText('Star');
    expect(imgElement).toHaveClass('star-img_checked');
  });

  test('dispatches removeCheckedCards action on checked star click', () => {
    renderComponent(props);

    const checkedStarImg = screen.getByAltText('Star');
    expect(checkedStarImg).toHaveClass('star-img_checked');
    fireEvent.click(checkedStarImg);

    const actions = store.getActions();
    expect(actions).toContainEqual(removeCheckedCards(1));
  });
});
