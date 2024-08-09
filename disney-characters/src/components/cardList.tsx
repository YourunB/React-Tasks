import s from './cardList.module.css';
import { CardListProps } from '../state/types';

const CardList = (props: CardListProps) => {
  return (
    <main className={s["card-list"]}>
      <h1>Rick and Morty</h1>
      <section className={s["cards"]}>
        {Array.isArray(props.cardCode) && props.cardCode.length > 0 ? props.cardCode : 'Nothing found...'}
      </section>
    </main>
  );
};

export default CardList;
