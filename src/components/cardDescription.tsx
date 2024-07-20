import './cardDescription.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetDetailsApiQuery } from '../redux/api/api';
import { RootState } from '../redux/store';
import { useParams } from 'react-router-dom';
import { updateId } from '../redux/dataSliceCharacter';
import { useEffect } from 'react';
import Loading from './loading';

const CardDescription = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const dataReduxDetails = useSelector( (state: RootState) => state.dataCharacter );
  const dataDetails = useGetDetailsApiQuery(dataReduxDetails.id);

  const params = useParams();
  const prodId = params.id;
  
  useEffect(() => {
    if (prodId && Number(prodId)) dispatch(updateId(prodId));
  }, [prodId, dispatch]);


  if (!dataDetails.data || !('data' in dataDetails.data) && !('name' in dataDetails.data.data)) return null;

  return (
    <div className="card-description">
      <div className="controls">
      <Link to="/" className="controls__btn" data-testid={'card-details'}>X</Link>
      </div>
      <img
        className="card-description__img"
        src={dataDetails.data.data.imageUrl || 'https://github.com/YourunB/Test1/blob/main/images/noimage.jpg?raw=true'}
        alt="Character"
      ></img>
      <h3 className="card-description__name">{dataDetails.data.data.name}</h3>
      <p className="card-description__description">Films: {dataDetails.data.data.films.join(', ') || 'none'}</p>
      <p className="card-description__description">TV Shows: {dataDetails.data.data.tvShows.join(', ') || 'none'}</p>
      <p className="card-description__description">Short Films: {dataDetails.data.data.shortFilms.join(', ') || 'none'}</p>
      <p className="card-description__description">Video Games: {dataDetails.data.data.videoGames.join(', ') || 'none'}</p>
      {dataDetails.isLoading || dataDetails.isFetching ? <Loading /> : null}
    </div>
  );
};

export default CardDescription;
