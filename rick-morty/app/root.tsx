import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./index.css";
import { store } from "./redux/store";
import { Provider } from 'react-redux';
import ThemeContext from './components/themeContext';

const theme = {
  light: false,
  change: function () {
    this.light = !this.light;
  },
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={theme}>
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
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
  );
}

export default function App() {
  return <Outlet />;
}
