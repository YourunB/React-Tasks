'use client'
import s from './card.module.css';
import { CardProps } from '../state/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updateCheckedCards, removeCheckedCards } from '../redux/dataSliceElements';
import { useRouter } from 'next/router';

const Card = (props: CardProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const dataReduxElements = useSelector((state: RootState) => state.dataElements);
  const dataReduxPage = useSelector((state: RootState) => state.dataPage);

  function addElementToSlice(event: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    event.preventDefault();
    dispatch(
      updateCheckedCards({
        id: props.id,
        name: props.name,
        image: props.image,
        species: props.species,
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
    <div className={s["card-char"]} data-testid={'card'} onClick={() => router.push(`?page=${dataReduxPage.page ? dataReduxPage.page : 1}${dataReduxPage.search ? `&search=${dataReduxPage.search}` : ''}&details=${props.id}`)}>
      <img
        className={s["card-char__img"]}
        src={props.image || 'https://github.com/YourunB/Test1/blob/main/images/noimage.jpg?raw=true'}
        alt={props.name}
      />
      <h4 className={s["card-char__title"]}>{props.name}</h4>
      <p className={s["card-char__description"]}>
        <span>Species: </span>
        {props.species || 'none'}
      </p>
      {
        <img
          className={`${s['star-img']} ${checked ? s['star-img_checked'] : ''}`}
          src='/star.svg'
          alt="Star"
          title="Checked character"
          onClick={(event) => (checked ? removeElementFromSlice(event) : addElementToSlice(event))}
        />
      }
    </div>
  );
};

export default Card;
