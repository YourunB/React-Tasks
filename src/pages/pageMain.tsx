import './pageMain.css';
import Footer from '../components/footer';
import Search from '../components/search';
import Card from '../components/card';
import CardList from '../components/cardList';
import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updatePage, updateTotalPages, updateSearch, updateTheme } from '../redux/dataSlicePage';
import { useGetCharactersApiQuery } from '../redux/api/api';
import { Character } from '../state/types';
import Pagination from '../components/pagination';
import Loading from '../components/loading';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import themeImg from '../assets/images/svg/theme.svg';
import Msg from '../components/msg';

const PageMain = () => {
  const dispatch = useDispatch();
  const serchInputRef = useRef(null);
  const dataReduxPage = useSelector( (state: RootState) => state.dataPage );
  const dataReduxElements = useSelector( (state: RootState) => state.dataElements );
  const dataCharacters = useGetCharactersApiQuery({page: dataReduxPage.page, search: dataReduxPage.search});
  const params = useParams();
  const prodPage = params.page;
  const prodSearch = params.search;
  const navigate = useNavigate();
  
  useEffect(() => {
    if (prodPage && Number(prodPage)) dispatch(updatePage(prodPage));
    if (prodSearch) dispatch(updateSearch(prodSearch));
  }, [prodPage, prodSearch, dispatch]);

  useEffect(() => {
    if (dataCharacters.data && dataCharacters.data.info) dispatch(updateTotalPages(dataCharacters.data.info.totalPages));
  }, [dataCharacters, dispatch])

  function clearSearch() {
    const input = serchInputRef.current as HTMLInputElement | null;
    if (input) input.value = '';
    dispatch(updatePage(1));
    dispatch(updateSearch(''));
    navigate(`/${1}/${''}`);
  }

  function changeSearchCharacters() {
    if (serchInputRef.current) {
      const input = serchInputRef.current as HTMLInputElement;
      const value = input.value.trim();
      if (value !== '') {
        dispatch(updatePage(1));
        dispatch(updateSearch(value));
        navigate(`/${1}/${value}`);
      }
    }
  }

  function changeTheme() {
    if (dataReduxPage.theme === 'light') dispatch(updateTheme('dark'));
    else dispatch(updateTheme('light'));
  }
  
  const searchCode = (
    <Search
      key={3003}
      serchInputRef={serchInputRef}
      search={dataReduxPage.search}
      clearSearch={clearSearch}
      changeSearchCharacters={changeSearchCharacters}
    />
  );

  let cardCode: JSX.Element | null | object = null;
  if (dataCharacters.data) {
    const data = Array.isArray(dataCharacters.data.data) ? dataCharacters.data.data : [dataCharacters.data.data];
    cardCode = data.map((character: Character) => (
      <Card
        key={character._id}
        id={character._id}
        image={character.imageUrl}
        name={character.name}
        films={character.films.join(', ')}
      />
    ));
  }
  
  const cardListCode = <CardList key={3002} cardCode={cardCode} />;

  const msg = dataReduxElements.checkedCards.length > 1 ? <Msg /> : null;

  return (
    <div className={`page-main ${dataReduxPage.theme === 'light' ? '' : 'light'}`} data-testid={'page-main'}>
      <header className="page-main__header">
        {searchCode}
        <img onClick={() => changeTheme()} className={`theme-img ${dataReduxPage.theme === 'light' ? 'theme-img_light' : ''}`} src={themeImg} alt='Theme' title='Change theme'/>
      </header>
      <main className="page-main__main">
        {cardListCode}
        <Pagination />
        <Outlet />
        {dataCharacters.isLoading || dataCharacters.isFetching ? <Loading /> : null}
        {msg}
      </main>
      <Footer />
    </div>
  );
};

export default PageMain;
