import './cardDescription.css';
import { CardDescriptionProps } from '../state/types';

const CardDescription = (props: CardDescriptionProps) => {
  return (
    <div className="card-description">
      <div className="controls">
        <button onClick={() => props.hideDescription()} className="controls__btn" data-testid={'card-details'}>
          X
        </button>
      </div>
      <img
        className="card-description__img"
        src={props.image || 'https://github.com/YourunB/Test1/blob/main/images/noimage.jpg?raw=true'}
        alt="Character"
      ></img>
      <h3 className="card-description__name">{props.name}</h3>
      <p className="card-description__description">Films: {props.films || 'none'}</p>
      <p className="card-description__description">TV Shows: {props.tvShows || 'none'}</p>
      <p className="card-description__description">Short Films: {props.shortFilms || 'none'}</p>
      <p className="card-description__description">Video Games: {props.videoGames || 'none'}</p>
    </div>
  );
};

export default CardDescription;
