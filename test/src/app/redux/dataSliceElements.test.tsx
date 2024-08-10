import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import dataSliceElements, { updateCheckedCards, removeCheckedCards, clearAll } from '../../../../src/app/redux/dataSliceElements';

describe('dataSliceElements reducer', () => {
  const initialState = {
    checkedCards: [{ id: null }],
  };

  test('init state', () => {
    expect(dataSliceElements(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('updateCheckedCards', () => {
    const actual = dataSliceElements(initialState, updateCheckedCards({ id: 1 }));
    expect(actual.checkedCards).toEqual([{ id: null }, { id: 1 }]);
  });

  test('updateCheckedCards', () => {
    const actual = dataSliceElements(
      {
        checkedCards: [{ id: 1 }],
      },
      updateCheckedCards({ id: 1 })
    );
    expect(actual.checkedCards).toEqual([{ id: 1 }]);
  });

  test('removeCheckedCards', () => {
    const stateWithCard = {
      checkedCards: [{ id: 1 }],
    };
    const actual = dataSliceElements(stateWithCard, removeCheckedCards(1));
    expect(actual.checkedCards).toEqual([]);
  });

  test('clearAll', () => {
    const stateWithCards = {
      checkedCards: [{ id: 1 }, { id: 2 }],
    };
    const actual = dataSliceElements(stateWithCards, clearAll());
    expect(actual.checkedCards).toEqual([{ id: null }]);
  });
});
