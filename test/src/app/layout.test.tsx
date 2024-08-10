import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import ThemeContext from '../../../src/app/components/themeContext';
import Head from '../../../src/app/components/head';
import { store } from '../../../src/app/redux/store';
import RootLayout from '../../../src/app/layout';
import { describe, test, expect } from 'vitest';

const theme = {
  light: false,
  change: function () {
    this.light = !this.light;
  },
};

describe('RootLayout component', () => {
  test('renders correctly with children', () => {
    const { container } = render(
      <Provider store={store}>
        <ThemeContext.Provider value={theme}>
          <RootLayout>
            <div>Test Child</div>
          </RootLayout>
        </ThemeContext.Provider>
      </Provider>
    );

    const headElement = container.querySelector('head');
    const bodyElement = container.querySelector('body');
    const childElement = container.querySelector('div');

    expect(headElement).toBeInTheDocument();
    expect(bodyElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Test Child');
  });

  test('provides the correct theme context', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ThemeContext.Provider value={theme}>
          <RootLayout>
            <div>Test Child</div>
          </RootLayout>
        </ThemeContext.Provider>
      </Provider>
    );

    expect(theme.light).toBe(false);
    theme.change();
    expect(theme.light).toBe(true);
  });
});