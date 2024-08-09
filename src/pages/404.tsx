import Head from 'next/head';
import PageNotFound from '@/components/pageNotFound';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        <PageNotFound />
      </main>
    </>
  );
}