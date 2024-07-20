import './card.css';
import { CardProps } from '../state/types';
import { Link } from 'react-router-dom';

const Card = (props: CardProps) => {
  return (
    <Link to={`/details/${props.id}`} className="card-char" data-testid={'card'} onClick={() => props.showDescription(props.id)}> 
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
    </Link>
  );
};

export default Card;
