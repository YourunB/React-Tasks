import './pagination.css';
import { CardListProps } from '../state/types';

const CardList = (props: CardListProps) => {
  return (
    <main className="page-main__main">
      <button className="btn-error" onClick={() => props.createError()}>
        Error
      </button>
      <h1>Disney Characters</h1>
      <section className="cards">{props.cardCode as JSX.Element}</section>
    </main>
  );
}

export default CardList