import earthImg from '../assets/images/earth.svg';
import { Link } from 'react-router-dom';

export const PageNotFound = () => {
  return (
    <main className="page not-found">
      <div className="not-found__box">
        <img src={earthImg} alt="Earth" />
        <h3>404</h3>
        <p>Page Not Found</p>
        <Link className="not-found__box__link" to="/">
          Home
        </Link>
      </div>
    </main>
  );
};
