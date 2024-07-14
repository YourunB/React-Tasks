import { render, screen, fireEvent } from '@testing-library/react';
import { vi, expect } from 'vitest';
import '@testing-library/jest-dom';
import React from 'react';
import CardList from '../../src/components/cardList';
import { CardListProps } from '../../src/state/types';

describe('CardList Component', () => {
  const props: CardListProps = {
    key: 3002,
    cardCode: [],
    createError: vi.fn(),
  };
  test('renders the title', () => {
    render(<CardList {...props} />);
    expect(screen.getByText('Disney Characters')).toBeInTheDocument();
  });

  test('renders "Nothing found..." when cardCode is empty', () => {
    render(<CardList {...props} />);
    expect(screen.getByText('Nothing found...')).toBeInTheDocument();
  });

  test('calls createError when the error button is clicked', () => {
    render(<CardList {...props} />);
    fireEvent.click(screen.getByText('Error'));
    expect(props.createError).toHaveBeenCalled();
  });
});
