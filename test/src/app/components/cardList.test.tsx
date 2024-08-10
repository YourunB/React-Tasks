import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import CardList from '../../../../src/app/components/cardList';
import { CardListProps } from '../../../../src/app/state/types';
import React from 'react';
import '@testing-library/jest-dom';

describe('CardList Component', () => {
  test('renders "Nothing found..." when cardCode is not an array or is empty', () => {
    const props: CardListProps = { key: 3002, cardCode: [] };
    const { getByText } = render(<CardList {...props} />);
    expect(getByText('Nothing found...')).toBeInTheDocument();
  });

  test('renders cardCode elements when cardCode is a non-empty array', () => {
    const CardOne = <div>Mickey Mouse</div>;
    const CardTwo = <div>Donald Duck</div>;
    const props: CardListProps = { key: 3002, cardCode: [CardOne, CardTwo] };
    const { getByText } = render(<CardList {...props} />);
    expect(getByText('Mickey Mouse')).toBeInTheDocument();
    expect(getByText('Donald Duck')).toBeInTheDocument();
  });
});
