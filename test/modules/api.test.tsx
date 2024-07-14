import { describe, test, expect, vi } from 'vitest';
import { getCharactersPageApi, searchCharactersApi, getOneCharacterApi } from '../../src/modules/api';
import '@testing-library/jest-dom';

const mockResponse = (data: object) => {
  return {
    json: () => Promise.resolve(data),
  };
};

global.fetch = vi.fn();

describe('API functions', () => {
  test('getCharactersPageApi', async () => {
    const data = { data: [{ _id: 1, name: 'Mickey Mouse' }] };
    (fetch as unknown as jest.Mock).mockResolvedValue(mockResponse(data));
    const result = await getCharactersPageApi(1, 10);
    expect(result).toEqual(data);
    expect(fetch).toHaveBeenCalledWith('https://api.disneyapi.dev/character?page=1&pageSize=10');
  });

  test('searchCharactersApi', async () => {
    const data = { data: [{ _id: 1, name: 'Mickey Mouse' }] };
    (fetch as unknown as jest.Mock).mockResolvedValue(mockResponse(data));
    const result = await searchCharactersApi('Mickey', 1, 10);
    expect(result).toEqual(data);
    expect(fetch).toHaveBeenCalledWith('https://api.disneyapi.dev/character?name=Mickey&pageSize=10&page=1');
  });

  test('getOneCharacterApi', async () => {
    const data = { _id: 1, name: 'Mickey Mouse' };
    (fetch as unknown as jest.Mock).mockResolvedValue(mockResponse(data));
    const result = await getOneCharacterApi(1);
    expect(result).toEqual(data);
    expect(fetch).toHaveBeenCalledWith('https://api.disneyapi.dev/character/1');
  });
});
