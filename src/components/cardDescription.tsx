import './cardDescription.css';
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
  const dataReduxDetails = useSelector( (state: RootState) => state.dataCharacter );
  const dataDetails = useGetDetailsApiQuery(dataReduxDetails.id);

  const params = useParams();
  const prodId = params.id;
  
  useEffect(() => {
    if (prodId && Number(prodId)) dispatch(updateId(prodId));
  }, [prodId, dispatch]);

  if (!dataDetails.data || !('data' in dataDetails.data) && !('name' in dataDetails.data.data)) return null;
  const data = {...dataDetails.data.data};

  return (
    <div className='overflow' onClick={() => navigate('/')} data-testid={'card-details'}>
      <div className="card-description" onClick={(event) => event.stopPropagation()}>
        <div className="controls">
        <button className="controls__btn" data-testid={'card-details-btn'} onClick={() => navigate('/')}>X</button>
        </div>
        <img
          className="card-description__img"
          src={dataDetails.data.data.imageUrl || 'https://github.com/YourunB/Test1/blob/main/images/noimage.jpg?raw=true'}
          alt="Character"
        ></img>
        <h3 className="card-description__name">{data.name}</h3>
        <p className="card-description__description">Films: {data.films.join(', ')}</p>
        <p className="card-description__description">TV Shows: {data.tvShows.join(', ')}</p>
        <p className="card-description__description">Short Films: {data.shortFilms.join(', ')}</p>
        <p className="card-description__description">Video Games: {data.videoGames.join(', ')}</p>
        {dataDetails.isLoading || dataDetails.isFetching ? <Loading /> : null}
      </div>
    </div>
  );
};

export default CardDescription;
