import './pagination.css';
import { PaginationProps } from '../state/types';

const Pagination = (props: PaginationProps) => {
  let disableBtnPrev = true;
  let disableBtnNext = true;
  if ('info' in props.obj && typeof props.obj.info === 'object' && props.obj.info && 'previousPage' in props.obj.info && 'nextPage' in props.obj.info) {
    if (props.obj.info.previousPage) disableBtnPrev = false;
    if (props.obj.info.nextPage) disableBtnNext = false;
  }

  return (
    <div className='pagination'>
    <button className='pagination__btn' onClick={() => props.changePage(-1)} disabled={disableBtnPrev}>&#60;</button>
    <span className='pagination__count'>{props.page}</span>
    <button className='pagination__btn' onClick={() => props.changePage(+1)} disabled={disableBtnNext}>&#62;</button>
  </div>
  );
}

export default Pagination