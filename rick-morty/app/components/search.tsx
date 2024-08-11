import s from './search.module.css';
import { useNavigate } from "@remix-run/react";
import { useRef } from 'react';
import { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { updatePage, updateSearch } from '../redux/dataSlicePage';
import ThemeContext from '../components/themeContext';
import { useContext } from 'react';

const Search = () => {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  const serchInputRef = useRef(null);
  const dataReduxPage = useSelector((state: RootState) => state.dataPage);
  const dispatch = useDispatch();

  function clearSearch() {
    const input = serchInputRef.current as HTMLInputElement | null;
    if (input) input.value = '';
    if (dataReduxPage.search) {
      dispatch(updatePage(1));
      dispatch(updateSearch(''));
      navigate(`/?page=1`);
    }
  }

  function changeSearchCharacters() {
    if (serchInputRef.current) {
      const input = serchInputRef.current as HTMLInputElement;
      const value = input.value.trim();
      if (value !== '') {
        dispatch(updatePage(1));
        dispatch(updateSearch(value));
        navigate(`/?page=1&search=${value}`);
      }
    }
  }

  return (
    <div className={`${s['search']} ${theme.light ? s['light'] : ''}`} data-testid={'search'}>
      <button onClick={() => clearSearch()} className={s['search__btn-clear']}>
        X
      </button>
      <input
        ref={serchInputRef}
        className={s['search__input']}
        placeholder="Search..."
        defaultValue={dataReduxPage.search}
      />
      <button onClick={() => changeSearchCharacters()} className={s['search__btn']}>
        Search
      </button>
    </div>
  );
};

export default Search;
