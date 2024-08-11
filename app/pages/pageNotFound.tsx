import s from './pageNotFound.module.css';
import { Link } from '@remix-run/react';

export default function PageNotFound() {
  return (
    <>
      <main className={`${s['page-not-found']}`} data-testid="page-not-found">
        <div className={s['error-box']}>
          <img className={s['error-box__img']} src="/earth.svg" alt="Earth" />
          <h2 className={s['error-box__title']}>404</h2>
          <p className={s['error-box__description']}>This Page Not Found</p>
          <Link className={s['error-box__link']} to="/">
            HOME
          </Link>
        </div>
      </main>
    </>
  );
}
