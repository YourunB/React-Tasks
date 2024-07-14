import { render, screen, fireEvent  } from '@testing-library/react';
import { describe, test, vi } from 'vitest';
import { SearchProps } from '../../src/state/types';
import Search from '../../src/components/search';
import React from "react";
import '@testing-library/jest-dom';

describe('Search Component', () => {
  const mockClearSearch = vi.fn();
  const mockChangeSearchCharacters = vi.fn();
  const mockSearchInputRef = { current: null };

  const props: SearchProps = {
    key: 3003,
    clearSearch: mockClearSearch,
    changeSearchCharacters: mockChangeSearchCharacters,
    serchInputRef: mockSearchInputRef,
    search: 'test'
  };

  test('renders correctly', () => {
    render(<Search {...props} />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('X')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('sets default value of the input field', () => {
    render(<Search {...props} />);
    expect(screen.getByPlaceholderText('Search...')).toHaveValue('test');
  });

  test('calls clearSearch when clear button is clicked', () => {
    render(<Search {...props} />);
    fireEvent.click(screen.getByRole('button', { name: /X/i }));
    expect(mockClearSearch).toHaveBeenCalled();
  });

  test('calls changeSearchCharacters when search button is clicked', () => {
    render(<Search {...props} />);
    fireEvent.click(screen.getByRole('button', { name: /Search/i }));
    expect(mockChangeSearchCharacters).toHaveBeenCalled();
  });
});