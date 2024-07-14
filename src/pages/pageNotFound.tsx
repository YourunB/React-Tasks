import './pageNotFound.css';
import earthImg from '../assets/images/svg/earth.svg';

const PageNotFound = () => {
  return (
    <div className="page-not-found" data-testid={'page-not-found'}>
      <div className="error-box">
        <img className="error-box__img" src={earthImg} alt="Earth" />
        <h2 className="error-box__title">404</h2>
        <p className="error-box__description">This Page Not Found</p>
        <a className="error-box__link" href="./">
          HOME
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
