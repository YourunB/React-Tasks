import s from './loading.module.css';

const Loading = () => {
  return (
    <div className={s['loading']} data-testid={'loading'}>
      <img className={s['loading__img']} src='/loading.gif' alt="Loading" />
    </div>
  );
};

export default Loading;
