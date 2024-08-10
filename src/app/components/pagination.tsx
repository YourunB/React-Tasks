import s from './pagination.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Pagination = () => {
  const dataReduxPage = useSelector((state: RootState) => state.dataPage);
  const dataReduxCharacter = useSelector((state: RootState) => state.dataCharacter);

  const changePage = (value: number) => {
    const newPage = Number(dataReduxPage.page) + value;
    location.search = `page=${newPage}${dataReduxPage.search ? `&search=${dataReduxPage.search}` : ''}${dataReduxCharacter.id ? `&details=${dataReduxCharacter.id}` : ''}`
  };

  return (
    <div className={s['pagination']}>
      <button
        className={s['pagination__btn']}
        disabled={dataReduxPage.page > 1 ? false : true}
        onClick={() => changePage(-1)}
      >
        &#60;
      </button>
      <span className={s['pagination__count']}>{dataReduxPage.page}</span>
      <button
        className={s['pagination__btn']}
        disabled={dataReduxPage.page < dataReduxPage.totalPages ? false : true}
        onClick={() => changePage(1)}
      >
        &#62;
      </button>
    </div>
  );
};

export default Pagination;
