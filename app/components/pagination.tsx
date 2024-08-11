import s from './pagination.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from '@remix-run/react';
import { useSearchParams } from '@remix-run/react';

const Pagination = () => {
  const dataReduxPage = useSelector((state: RootState) => state.dataPage);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const getSearchParams = {
    details: searchParams.get('details'),
  };

  const changePage = (value: number) => {
    const newPage = Number(dataReduxPage.page) + value;
    navigate(
      `/?page=${newPage}${dataReduxPage.search ? `&search=${dataReduxPage.search}` : ''}${getSearchParams.details ? `&details=${getSearchParams.details}` : ''}`
    );
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