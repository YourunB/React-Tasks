import s from './pagination.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Link from 'next/link';

const Pagination = () => {
  const dataReduxPage = useSelector((state: RootState) => state.dataPage);
  const dataReduxCharacter = useSelector((state: RootState) => state.dataCharacter);

  return (
    <div className={s['pagination']}>
      <button
        className={s['pagination__btn']}
        disabled={dataReduxPage.page > 1 ? false : true}
      >
        <Link className={s.link} href={`/?page=${Number(dataReduxPage.page) - 1}${dataReduxPage.search ? `&search=${dataReduxPage.search}` : ''}`}>&#60;</Link>
      </button>
      <span className={s['pagination__count']}>{dataReduxPage.page}</span>
      <button
        className={s['pagination__btn']}
        disabled={dataReduxPage.page < dataReduxPage.totalPages ? false : true}
      >
        <Link className={s.link} href={`/?page=${Number(dataReduxPage.page) + 1}${dataReduxPage.search ? `&search=${dataReduxPage.search}` : ''}`}>&#62;</Link>
      </button>
    </div>
  );
};

export default Pagination;
