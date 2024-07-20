import './pagination.css';
import { PaginationProps } from '../state/types';

const Pagination = (props: PaginationProps) => {
  return (
    <div className="pagination">
      <button className="pagination__btn" onClick={() => props.changePage(-1)} disabled={props.btnPrevIsDisabled}>
        &#60;
      </button>
      <span className="pagination__count">{props.page}</span>
      <button className="pagination__btn" onClick={() => props.changePage(+1)} disabled={props.btnNextIsDisabled}>
        &#62;
      </button>
    </div>
  );
};

export default Pagination;
