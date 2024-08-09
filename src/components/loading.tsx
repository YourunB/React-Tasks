import s from './loading.module.css';
import loadingImg from '../../public/loading.gif';
import Image from 'next/image';

const Loading = () => {
  return (
    <div className={s['loading']} data-testid={'loading'}>
      <Image className={s['loading__img']} src={loadingImg} alt="Loading" width={250} height={250}/>
    </div>
  );
};

export default Loading;
