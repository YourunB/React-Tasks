import './pageMain.module.css';
import Footer from '../components/footer';
import Search from '../components/search';
import Card from '../components/card';
import CardList from '../components/cardList';
import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updatePage, updateTotalPages, updateSearch, updateTheme } from '../redux/dataSlicePage';
import { useGetCharactersApiQuery } from '../redux/api/api';
import { Character } from '../state/types';
import Pagination from '../components/pagination';
import Loading from '../components/loading';
//import { Outlet, useParams } from 'react-router-dom';
import themeImg from '../../public/theme.svg';
import Image from 'next/image';
import Msg from '../components/msg';
import ThemeContext from '../components/themeContext';

const PageMain = () => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const dataReduxPage = useSelector((state: RootState) => state.dataPage);
  const dataReduxElements = useSelector((state: RootState) => state.dataElements);
  const dataCharacters = useGetCharactersApiQuery({ page: dataReduxPage.page, search: dataReduxPage.search });
  //const params = useParams();
  //const prodPage = params.page;
  //const prodSearch = params.search;

  /*useEffect(() => {
    if (prodPage && Number(prodPage)) dispatch(updatePage(prodPage));
    if (prodSearch) dispatch(updateSearch(prodSearch));
  }, [prodPage, prodSearch, dispatch]);*/

  useEffect(() => {
    if (dataCharacters.data && dataCharacters.data.info)
      dispatch(updateTotalPages(dataCharacters.data.info.totalPages));
  }, [dataCharacters, dispatch]);

  function changeTheme() {
    theme.change();
    dispatch(updateTheme(theme.light));
  }

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
    <div className={`page-main ${theme.light ? 'light' : ''}`} data-testid={'page-main'}>
      <header className="page-main__header">
        <Search />
        <Image
          onClick={() => changeTheme()}
          className={`theme-img ${theme.light ? '' : 'theme-img_light'}`}
          src={themeImg}
          alt="Theme"
          title="Change theme"
          data-testid={'theme-button'}
        />
      </header>
      <main className="page-main__main">
        {cardListCode}
        <Pagination />
 
        {dataCharacters.isLoading || dataCharacters.isFetching ? <Loading /> : null}
        {msg}
      </main>
      <Footer />
    </div>
  );
};

export default PageMain;
