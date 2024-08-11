import Head from 'next/head';
import s from './not-found.module.css'
import Link from 'next/link';
import Image from 'next/image';

export default function PageNotFound() {
  return (
    <>
      <Head>
        <title>404</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className={`${s['page-not-found']}`} data-testid='page-not-found'>
        <div className={s['error-box']}>
          <Image className={s['error-box__img']} src='/earth.svg' alt="Earth" width={250} height={250}/>
          <h2 className={s['error-box__title']}>404</h2>
          <p className={s['error-box__description']}>This Page Not Found</p>
          <Link className={s['error-box__link']} href="/">
            HOME
          </Link>
        </div>
      </main>
    </>
  );
}