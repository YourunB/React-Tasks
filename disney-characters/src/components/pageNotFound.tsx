import s from './pageNotFound.module.css';
import earthImg from '../../public/earth.svg';
import ThemeContext from '../components/themeContext';
import { useContext } from 'react';
import Image from '../../node_modules/next/image';

const PageNotFound = () => {
  const theme = useContext(ThemeContext);

  return (
    <div className={`${s['page-not-found']} ${theme.light ? s['page-not-found_light'] : ''}`} data-testid={s['page-not-found']}>
      <div className={s['error-box']}>
        <Image className={s["error-box__img"]} src={earthImg} alt="Earth" />
        <h2 className={s["error-box__title"]}>404</h2>
        <p className={s["error-box__description"]}>This Page Not Found</p>
        <a className={s["error-box__link"]} href="/">
          HOME
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
