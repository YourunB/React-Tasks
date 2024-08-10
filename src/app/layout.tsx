'use client'
import { Provider } from 'react-redux';
import { store } from '../app/redux/store';
import ThemeContext from '../app/components/themeContext';
import Head from './components/head';
import "./globals.css";

const theme = {
  light: false,
  change: function () {
    this.light = !this.light;
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={theme}>
        <html lang="en">
          <Head />
          <body>{children}</body>
        </html>
      </ThemeContext.Provider>
    </Provider>
  )
}