import s from './cardDescription.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useGetDetailsApiQuery } from '../redux/api/api';
import { RootState } from '../redux/store';
import { useParams, useNavigate } from 'react-router-dom';
import { updateId } from '../redux/dataSliceCharacter';
import { useEffect } from 'react';
import Loading from './loading';

const CardDescription = (): JSX.Element | null => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataReduxDetails = useSelector((state: RootState) => state.dataCharacter);
  const dataDetails = useGetDetailsApiQuery(dataReduxDetails.id);

  const params = useParams();
  const prodId = params.id;

  useEffect(() => {
    if (prodId && Number(prodId)) dispatch(updateId(prodId));
  }, [prodId, dispatch]);

  if (!dataDetails.data || (!('data' in dataDetails.data) && !('name' in dataDetails.data.data))) return null;
  const data = { ...dataDetails.data.data };

  return (
    <div className={s["overlay"]} onClick={() => navigate('/')} data-testid={'card-details'}>
      <div className={s["card-description"]} onClick={(event) => event.stopPropagation()}>
        <div className={s["controls"]}>
          <button className={s["controls__btn"]} data-testid={'card-details-btn'} onClick={() => navigate('/')}>
            X
          </button>
        </div>
        <img
          className={s["card-description__img"]}
          src={
            dataDetails.data.data.imageUrl || 'https://github.com/YourunB/Test1/blob/main/images/noimage.jpg?raw=true'
          }
          alt="Character"
        ></img>
        <h3 className={s["card-description__name"]}>{data.name}</h3>
        <p className={s["card-description__description"]}>Films: {data.films.join(', ')}</p>
        <p className={s["card-description__description"]}>TV Shows: {data.tvShows.join(', ')}</p>
        <p className={s["card-description__description"]}>Short Films: {data.shortFilms.join(', ')}</p>
        <p className={s["card-description__description"]}>Video Games: {data.videoGames.join(', ')}</p>
      </div>
      {dataDetails.isLoading || dataDetails.isFetching ? <Loading /> : null}
    </div>
  );
};

export default CardDescription;
