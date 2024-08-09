import s from './pagination.module.css';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Pagination = () => {
  const router = useRouter();
  const dataReduxPage = useSelector((state: RootState) => state.dataPage);

  const changePage = (value: number) => {
    const newPage = Number(dataReduxPage.page) + value;
    router.push(`/${newPage}/${dataReduxPage.search}`);
  };

  return (
    <div className={s["pagination"]}>
      <button
        className={s["pagination__btn"]}
        disabled={dataReduxPage.page > 1 ? false : true}
        onClick={() => changePage(-1)}
      >
        &#60;
      </button>
      <span className={s["pagination__count"]}>{dataReduxPage.page}</span>
      <button
        className={s["pagination__btn"]}
        disabled={dataReduxPage.page < dataReduxPage.totalPages ? false : true}
        onClick={() => changePage(1)}
      >
        &#62;
      </button>
    </div>
  );
};

export default Pagination;
