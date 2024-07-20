import './pagination.css';
import { PaginationProps } from '../state/types';
import { Link } from 'react-router-dom';

const Pagination = (props: PaginationProps) => {
  return (
    <div className="pagination">
      <button className="pagination__btn" disabled={props.btnPrevIsDisabled}>
        <Link to={`/${props.page - 1}`}>&#60;</Link>
      </button>
      <span className="pagination__count">{props.page}</span>
      <button className="pagination__btn" disabled={props.btnNextIsDisabled}>
        <Link to={`/${Number(props.page) + 1}`}> &#62;</Link>
      </button>
    </div>
  );
};

export default Pagination;
