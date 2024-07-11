import './card.css';
import { CardProps } from '../state/types';

const Card = (props: CardProps) => {
  return (
    <a className="card-char" href={props.source} target="_blank" rel="noreferrer">
      <img
        className="card-char__img"
        src={props.image || 'https://github.com/YourunB/Test1/blob/main/images/noimage.jpg?raw=true'}
        alt={props.name}
      />
      <h4 className="card-char__title">{props.name}</h4>
      <p className="card-char__description">
        <span>Films: </span>
        {props.films || 'none'}
      </p>
      <p className="card-char__description">
        <span>TV Shows: </span>
        {props.tvShows || 'none'}
      </p>
      <p className="card-char__description">
        <span>Games: </span>
        {props.games || 'none'}
      </p>
    </a>
  );
};

export default Card;
