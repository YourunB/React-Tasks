import Head from './components/head';
import ReduxProviderWrapper from './components/ReduxProviderWrapper';
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReduxProviderWrapper>
      <html lang="en">
        <Head />
        <body>{children}</body>
      </html>
    </ReduxProviderWrapper>
  )
}