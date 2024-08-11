import { render, screen } from '@testing-library/react';
import { Layout } from '../app/root';
import { Provider } from 'react-redux';
import { store } from '../app/redux/store';
import ThemeContext from '../app/components/themeContext';
import { test, describe, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router';


const theme = {
  light: false,
  change: function () {
    this.light = !this.light;
  },
};

describe('Layout component', () => {
  vi.mock('@remix-run/react', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      RemixBrowser: ({ children }: { children: ReactNode }) => <div>{children}</div>,
      Meta: () => <meta />,
      Links: () => <link />,
      ScrollRestoration: () => <div />,
      Scripts: () => <script />,
    };
  });

  test('renders children correctly', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <ThemeContext.Provider value={theme}>
            <Layout>
              <div>Test Child</div>
            </Layout>
          </ThemeContext.Provider>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
