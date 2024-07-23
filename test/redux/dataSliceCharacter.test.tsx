import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import dataSliceCharacter, { updateDetails, updateId } from '../../src/redux/dataSliceCharacter';

describe('dataSliceCharacter reducer', () => {
  const initialState = {
    id: 10,
    details: {},
  };

  test('init state', () => {
    expect(dataSliceCharacter(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test(' updateDetails', () => {
    const actual = dataSliceCharacter(initialState, updateDetails({ name: 'John Doe' }));
    expect(actual.details).toEqual({ name: 'John Doe' });
  });

  test('updateId', () => {
    const actual = dataSliceCharacter(initialState, updateId(20));
    expect(actual.id).toEqual(20);
  });
});