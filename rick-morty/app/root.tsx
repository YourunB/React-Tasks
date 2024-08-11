import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./styles/index.css";
import { store } from "./redux/store";
import { Provider } from 'react-redux';
import ThemeContext from './components/themeContext';
import ErrorBoundary from "./modules/errorBoundary";

const theme = {
  light: false,
  change: function () {
    this.light = !this.light;
  },
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeContext.Provider value={theme}>
          <html lang="en">
            <head>
              <meta charSet="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
              <Meta />
              <Links />
            </head>
            <body>
              {children}
              <ScrollRestoration />
              <Scripts />
            </body>
          </html>
        </ThemeContext.Provider>
      </Provider>
    </ErrorBoundary>
  );
}

export default function App() {
  return <Outlet />;
}
