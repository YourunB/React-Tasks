import s from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();

  const isCurrentPage = (itemPath: string) => {
    return itemPath === location.pathname;
  };

  return (
    <header className={s.header}>
      <ul className={s.menu}>
        <li className={`${s['menu__item']} ${isCurrentPage('/') ? s['menu__item_checked'] : ''}`}>
          <Link to='/'>Main</Link>
        </li>
        <li className={`${s['menu__item']} ${isCurrentPage('/uncontrolled') ? s['menu__item_checked'] : ''}`}>
          <Link to='/uncontrolled'>Uncontrolled Form</Link>
        </li>
        <li className={`${s['menu__item']} ${isCurrentPage('/controlled') ? s['menu__item_checked'] : ''}`}>
          <Link to='/controlled'>React Hook Form</Link>
        </li>
      </ul>
    </header>
  );
};
