'use client'
import './card.module.css';
import { CardProps } from '../state/types';
import Link from '../../node_modules/next/link';
import starImg from '../assets/images/svg/star.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updateCheckedCards, removeCheckedCards } from '../redux/dataSliceElements';

const Card = (props: CardProps) => {
  const dispatch = useDispatch();
  const dataReduxElements = useSelector((state: RootState) => state.dataElements);

  function addElementToSlice(event: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    event.preventDefault();
    dispatch(
      updateCheckedCards({
        id: props.id,
        name: props.name,
        image: props.image,
        films: props.films || 'none',
        url: location.href,
      })
    );
  }

  function removeElementFromSlice(event: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    event.preventDefault();
    dispatch(removeCheckedCards(props.id));
  }

  let checked = false;
  dataReduxElements.checkedCards.forEach((el) => {
    if (el.id === props.id) checked = true;
  });

  return (
    <Link href={`/details/${props.id}`} className="card-char" data-testid={'card'}>
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
      {
        <img
          className={`star-img ${checked ? 'star-img_checked' : ''}`}
          src={starImg}
          alt="Star"
          title="Checked character"
          onClick={(event) => (checked ? removeElementFromSlice(event) : addElementToSlice(event))}
        />
      }
    </Link>
  );
};

export default Card;
