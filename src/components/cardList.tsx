import './cardList.css';
import { CardListProps } from '../state/types';
import Loading from './loading';

const CardList = (props: CardListProps) => {
  return (
    <main className="card-list">
      <h1>Disney Characters</h1>
      <section className="cards">
        {Array.isArray(props.cardCode) && props.cardCode.length > 0 ? props.cardCode : 'Nothing found...' && <Loading />}
      </section>
    </main>
  );
};

export default CardList;
