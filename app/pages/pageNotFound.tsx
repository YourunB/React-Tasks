import s from './pageNotFound.module.css';

export default function PageNotFound() {
  return (
    <>
      <main className={`${s['page-not-found']}`} data-testid="page-not-found">
        <div className={s['error-box']}>
          <img className={s['error-box__img']} src="/earth.svg" alt="Earth" />
          <h2 className={s['error-box__title']}>404</h2>
          <p className={s['error-box__description']}>This Page Not Found</p>
          <a className={s['error-box__link']} href="/">
            HOME
          </a>
        </div>
      </main>
    </>
  );
}
