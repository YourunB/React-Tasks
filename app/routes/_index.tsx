import type { MetaFunction } from '@remix-run/node';
import s from '../styles/_index.module.css';
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
import CardDescription from '../components/cardDescription';
import themeImg from '/theme.svg';
import Msg from '../components/msg';
import ThemeContext from '../components/themeContext';
import { useSearchParams } from '@remix-run/react';
import { updateId } from '~/redux/dataSliceCharacter';

export const meta: MetaFunction = () => {
  return [{ title: 'Rick and Morty' }, { name: 'description', content: 'Rick and Morty characters' }];
};

export default function Index() {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const dataReduxPage = useSelector((state: RootState) => state.dataPage);
  const dataReduxElements = useSelector((state: RootState) => state.dataElements);
  const dataCharacters = useGetCharactersApiQuery({ page: dataReduxPage.page, search: dataReduxPage.search });

  const [searchParams, setSearchParams] = useSearchParams();
  const getSearchParams = {
    page: searchParams.get('page'),
    search: searchParams.get('search'),
    details: searchParams.get('details'),
  };

  useEffect(() => {
    if (getSearchParams.page && Number(getSearchParams.page)) dispatch(updatePage(getSearchParams.page));
    if (getSearchParams.search) dispatch(updateSearch(getSearchParams.search));
    if (getSearchParams.details && Number(getSearchParams.details)) dispatch(updateId(getSearchParams.details));
  }, [getSearchParams.page, getSearchParams.search, getSearchParams.details, dispatch]);

  useEffect(() => {
    if (dataCharacters.data && dataCharacters.data.info) dispatch(updateTotalPages(dataCharacters.data.info.pages));
  }, [dataCharacters, dispatch]);

  function changeTheme() {
    theme.change();
    dispatch(updateTheme(theme.light));
  }

  let cardCode: JSX.Element | null | object = null;
  if (dataCharacters.data) {
    const data = Array.isArray(dataCharacters.data.results)
      ? dataCharacters.data.results
      : [dataCharacters.data.results];
    cardCode = data.map((character: Character) => (
      <Card
        key={character.id}
        id={character.id}
        image={character.image}
        name={character.name}
        species={character.species}
      />
    ));
  }

  const cardListCode = <CardList key={3002} cardCode={cardCode} />;

  const msg = dataReduxElements.checkedCards.length > 1 ? <Msg /> : null;

  return (
    <div className={`${s['page-main']} ${theme.light ? s['light'] : ''}`} data-testid={'page-main'}>
      <header className={s['page-main__header']}>
        <Search />
        <img
          onClick={() => changeTheme()}
          className={`${s['theme-img']} ${theme.light ? '' : s['theme-img_light']}`}
          src={themeImg}
          alt="Theme"
          title="Change theme"
          data-testid={'theme-button'}
        />
      </header>
      <main className={s['page-main__main']}>
        {cardListCode}
        <Pagination />
        {getSearchParams.details && Number(getSearchParams.details) ? <CardDescription /> : null}
        {dataCharacters.isLoading || dataCharacters.isFetching ? <Loading /> : null}
        {msg}
      </main>
      <Footer />
    </div>
  );
}
