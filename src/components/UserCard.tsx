import s from './UserCard.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const UserCard = () => {
  const dataRedux = useSelector((state: RootState) => state.data);

  return (
    <div>
      {dataRedux.user ? 
        <div className={s.card}>
          <div className={s['card__data']}>
            <p>Name: {dataRedux.user.name}</p>
            <p>Age: {dataRedux.user.age}</p>
            <p>Gender: {dataRedux.user.gender}</p>
            <p>Country: {dataRedux.user.country}</p>
            <p>Email: {dataRedux.user.email}</p>
            <p>Password: {dataRedux.user.pass}</p>
            <p>Agreement: {String(dataRedux.user.agreement)}</p>
          </div>
          <img className={s['card__image']} src={dataRedux.user.image} alt='Photo'></img>
        </div>
      : <p>You need save user data from form ...</p>}
    </div>
  );
};
