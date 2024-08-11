import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import dataSlicePage, { updatePage, updateTotalPages, updateSearch, updateTheme } from '../../app/redux/dataSlicePage';

describe('dataSlicePage reducer', () => {
  const initialState = {
    page: 1,
    totalPages: 1,
    search: '',
    theme: { light: false },
  };

  test('should update the page', () => {
    const newState = dataSlicePage(initialState, updatePage(2));
    expect(newState.page).toEqual(2);
  });

  test('should update the total pages', () => {
    const newState = dataSlicePage(initialState, updateTotalPages(5));
    expect(newState.totalPages).toEqual(5);
  });

  test('should update the search', () => {
    const newState = dataSlicePage(initialState, updateSearch('new search query'));
    expect(newState.search).toEqual('new search query');
  });

  test('should update the theme', () => {
    const newState = dataSlicePage(initialState, updateTheme(true));
    expect(newState.theme.light).toEqual(true);
  });
});
