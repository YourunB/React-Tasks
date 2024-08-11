import s from './card.module.css';
import { CardProps } from '../state/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updateCheckedCards, removeCheckedCards } from '../redux/dataSliceElements';
import ThemeContext from '../components/themeContext';
import { useContext } from 'react';
import Link from 'next/link';

const Card = (props: CardProps) => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const dataReduxElements = useSelector((state: RootState) => state.dataElements);
  const dataReduxPage = useSelector((state: RootState) => state.dataPage);
  
  function toogleElement(event: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    event.stopPropagation();
    event.preventDefault();
    if (checked) dispatch(removeCheckedCards(props.id));
    else {
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
  }

  let checked = false;
  dataReduxElements.checkedCards.forEach((el) => {
    if (el.id === props.id) checked = true;
  });

  return (
    <Link href={`/?page=${dataReduxPage.page ? dataReduxPage.page : 1}${dataReduxPage.search ? `&search=${dataReduxPage.search}` : ''}&details=${props.id}`}
      className={`${s['card-char']} ${theme.light ? s['light'] : ''}`}
      data-testid={'card'}
    >
      <img className={s['card-char__img']} src={props.image || '/noimage.jpg'} alt={props.name} />
      <h4 className={s['card-char__title']}>{props.name}</h4>
      <p className={s['card-char__description']}>
        <span>Species: </span>
        {props.species || 'none'}
      </p>
      {
        <img
          className={`${s['star-img']} ${checked ? s['star-img_checked'] : ''}`}
          src="/star.svg"
          alt="Star"
          title="Checked character"
          onClick={(event: React.MouseEvent<HTMLImageElement, MouseEvent>) => toogleElement(event)}
        />
      }
    </Link>
  );
};

export default Card;
