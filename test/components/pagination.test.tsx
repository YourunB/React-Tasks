import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import Pagination from '../../src/components/pagination';
import { PaginationProps } from '../../src/state/types';
import React from "react";
import '@testing-library/jest-dom';

describe('Pagination Component', () => {
  const props: PaginationProps = {
    key: 3001,
    page: 1,
    obj: { info: { previousPage: null, nextPage: null } },
    changePage: vi.fn(),
  };

  test('renders current page number', () => {
    render(<Pagination {...props} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('disables previous button when there is no previous page', () => {
    render(<Pagination {...props} />);
    expect(screen.getByRole('button', { name: /</i })).toBeDisabled();
  });

  test('enables next button when there is a next page', () => {
    render(<Pagination {...props} />);
    expect(screen.getByRole('button', { name: />/i })).toBeDisabled();
  });

  const propsChange = {
    key: 3001,
    obj: {
      info: {
        previousPage: 'somePage',
        nextPage: 'somePage'
      }
    },
    page: 1,
    changePage: vi.fn()
  };

  test('calls changePage with -1 when previous button is clicked', () => {
    render(<Pagination {...propsChange} />);
    fireEvent.click(screen.getByRole('button', { name: /</i }));
    expect(propsChange.changePage).toHaveBeenCalledWith(-1);
  });

  test('calls changePage with +1 when next button is clicked', () => {
    render(<Pagination {...propsChange} />);
    fireEvent.click(screen.getByRole('button', { name: />/i }));
    expect(propsChange.changePage).toHaveBeenCalledWith(1);
  });
});