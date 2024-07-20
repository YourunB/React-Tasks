import './pagination.modules.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Pagination = () => {
  const dataReduxPage = useSelector( (state: RootState) => state.dataPage );
  
  return (
    <div className="pagination">
      <button className="pagination__btn" disabled={dataReduxPage.page > 1 ? false : true}>
        <Link to={`/${dataReduxPage.page - 1}/${dataReduxPage.search}`}>&#60;</Link>
      </button>
      <span className="pagination__count">{dataReduxPage.page}</span>
      <button className="pagination__btn" disabled={dataReduxPage.page < dataReduxPage.totalPages ? false : true}>
        <Link to={`/${Number(dataReduxPage.page) + 1}/${dataReduxPage.search}`}> &#62;</Link>
      </button>
    </div>
  );
};

export default Pagination;
