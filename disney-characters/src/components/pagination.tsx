import s from './pagination.module.css';
//import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Pagination = () => {
  //const navigate = useNavigate();
  const dataReduxPage = useSelector((state: RootState) => state.dataPage);

  const changePage = (value: number) => [
    //navigate(`/${Number(dataReduxPage.page) + value}/${dataReduxPage.search}`)
  ];

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