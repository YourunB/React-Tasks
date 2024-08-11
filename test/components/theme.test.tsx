import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useContext } from 'react';
import ThemeContext from '../../app/components/themeContext';
import { describe, test, expect } from 'vitest'; 

describe('ThemeContext', () => {
  test('initial light value as false', () => {
    const { result } = renderHook(() => useContext(ThemeContext));
    expect(result.current.light).toBe(false);
  });

  test('toggle light', () => {
    const { result } = renderHook(() => useContext(ThemeContext));

    act(() => result.current.change());
    expect(result.current.light).toBe(true);
    act(() => result.current.change());
    expect(result.current.light).toBe(false);
  });
});
