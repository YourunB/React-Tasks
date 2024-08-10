'use client';
import s from './footer.module.css';

const Footer = () => {
  return (
    <footer className={s['footer']}>
      <span>&copy; 2024</span>
      <a
        className={s['footer__link']}
        href="https://github.com/YourunB"
        target="_blank"
        rel="noreferrer"
        data-testid={'footer'}
      >
        Yury Butskevich
      </a>
    </footer>
  );
};

export default Footer;
