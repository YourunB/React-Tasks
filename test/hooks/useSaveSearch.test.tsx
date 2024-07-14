import { renderHook, act } from '@testing-library/react'
import useSaveSearch from '../../src/hooks/useSaveSearch';

describe('useSaveSearch', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  
  test('should initialize with value from localStorage', () => {
    localStorage.setItem('searchHistory', 'initial value');
    const { result } = renderHook(() => useSaveSearch());
    expect(result.current[0]).toBe('initial value');
  });

  test('should return empty string if localStorage is empty', () => {
    const { result } = renderHook(() => useSaveSearch());
    expect(result.current[0]).toBe('');
  });
});