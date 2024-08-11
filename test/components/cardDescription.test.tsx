import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import CardDescription from '../../app/components/cardDescription';
import { dataSliceCharacter } from '../../app/redux/dataSliceCharacter';
import { api } from '../../app/redux/api/api';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { describe, test, beforeAll, vi } from 'vitest';

beforeAll(() => {
  vi.mock('@remix-run/react', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useNavigate: vi.fn(() => vi.fn()),
      useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
    };
  });
});

const renderWithProviders = (ui: ReactNode, route: string) => {
  const store = configureStore({
    reducer: {
      dataCharacter: dataSliceCharacter.reducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  });

  setupListeners(store.dispatch);

  return render(
    <Provider store={store}>
      <CardDescription />
    </Provider>
  );
};

describe('CardDescription', () => {
  test('renders correctly with data', async () => {
    renderWithProviders(<CardDescription />, '/?page=1&details=1');
  });
});
