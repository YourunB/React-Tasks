import './loading.module.css';
import loadingImg from '../assets/images/loading.gif';

const Loading = () => {
  return (
    <div className="loading" data-testid={'loading'}>
      <img className="loading__img" src={loadingImg} alt="Loading" />
    </div>
  );
};

export default Loading;
