import s from './footer.module.css';
import { Link } from '@remix-run/react';

const Footer = () => {
  return (
    <footer className={s['footer']}>
      <span>&copy; 2024</span>
      <Link
        className={s['footer__link']}
        to="https://github.com/YourunB"
        target="_blank"
        rel="noreferrer"
        data-testid={'footer'}
      >
        Yury Butskevich
      </Link>
    </footer>
  );
};

export default Footer;
