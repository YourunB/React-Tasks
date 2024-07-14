import './cardDescription.css';
import { CardDescriptionProps } from '../state/types';

const CardDescription = (props: CardDescriptionProps) => {
  return (
    <div className='card-description'>
      <div className='controls'>
        <button onClick={() => props.hideDescription()} className='controls__btn'>X</button>
      </div>
      <img className='card-description__img' src={props.image || 'https://github.com/YourunB/Test1/blob/main/images/noimage.jpg?raw=true'} alt='Character'></img>
      <h3 className='card-description__name'>{props.name}</h3>
      <p className='card-description__description'><span>Films: </span>{props.films || 'none'}</p>
      <p className='card-description__description'><span>TV Shows: </span>{props.tvShows || 'none'}</p>
      <p className='card-description__description'><span>Short Films: </span>{props.shortFilms || 'none'}</p>
      <p className='card-description__description'><span>Video Games: </span>{props.videoGames || 'none'}</p>
    </div>
  );
}

export default CardDescription