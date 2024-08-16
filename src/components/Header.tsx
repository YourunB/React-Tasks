import s from './Header.module.css';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className={s.header}>
      <ul className={s.menu}>
        <li>
          <Link to='/'>Main</Link>
        </li>
        <li>
          <Link to='/uncontrolled'>Uncontrolled Form</Link>
        </li>
        <li>
          <Link to='/controlled'>React Hook Form</Link>
        </li>
      </ul>
    </header>
  );
};
