import './cardList.css';
import { CardListProps } from '../state/types';

const CardList = (props: CardListProps) => {
  return (
    <main className="card-list">
      <button className="btn-error" onClick={() => props.createError()}>
        Error
      </button>
      <h1>Disney Characters</h1>
      <section className="cards">{Array.isArray(props.cardCode) && props.cardCode.length > 0 ? props.cardCode : 'Nothing found...'}</section>
    </main>
  );
}

export default CardList