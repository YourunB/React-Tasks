import s from './cardDescription.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useGetDetailsApiQuery } from '../redux/api/api';
import { RootState } from '../redux/store';
import { updateId } from '../redux/dataSliceCharacter';
import { useEffect } from 'react';
import Loading from './loading';
import { useRouter } from 'next/router';
import ThemeContext from '../components/themeContext';
import { useContext } from 'react';

const CardDescription = (): JSX.Element | null => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const dataReduxDetails = useSelector((state: RootState) => state.dataCharacter);
  const dataDetails = useGetDetailsApiQuery(dataReduxDetails.id);
  const dataReduxPage = useSelector((state: RootState) => state.dataPage);

  const router = useRouter();
  const prodId = router.query.details;

  useEffect(() => {
    if (prodId && Number(prodId)) dispatch(updateId(prodId));
  }, [prodId, dispatch]);

  if (!dataDetails.data || (!('data' in dataDetails) && !('name' in dataDetails.data))) return null;
  const data = { ...dataDetails.data };

  const closeDetails = () => {
    router.push(
      `?page=${dataReduxPage.page ? dataReduxPage.page : 1}${dataReduxPage.search ? `&search=${dataReduxPage.search}` : ''}`
    );
  };

  return (
    <div className={s['overlay']} data-testid={'card-details'} onClick={closeDetails}>
      <div
        className={`${s['card-description']} ${theme.light ? s['light'] : ''}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={s['controls']}>
          <button className={s['controls__btn']} data-testid={'card-details-btn'} onClick={closeDetails}>
            X
          </button>
        </div>
        <img
          className={s['card-description__img']}
          src={dataDetails.data.image || 'https://github.com/YourunB/Test1/blob/main/images/noimage.jpg?raw=true'}
          alt="Character"
        ></img>
        <h3 className={s['card-description__name']}>{data.name}</h3>
        <p className={s['card-description__description']}>Species: {data.species}</p>
        <p className={s['card-description__description']}>Status: {data.status}</p>
        <p className={s['card-description__description']}>Gender: {data.gender}</p>
        <p className={s['card-description__description']}>Location: {data.location.name}</p>
        <p className={s['card-description__description']}>Origin: {data.origin.name}</p>
      </div>
      {dataDetails.isLoading || dataDetails.isFetching ? <Loading /> : null}
    </div>
  );
};

export default CardDescription;
