import { useState, useRef, useEffect, useCallback } from 'react';
import './pageMain.css';
import { getCharactersPageApi, searchCharactersApi, getOneCharacterApi } from '../modules/api';
import Card from '../components/card';
import Loading from '../components/loading';
import Footer from '../components/footer';
import Pagination from '../components/pagination';
import CardList from '../components/cardList';
import Search from '../components/search';
import CardDescription from '../components/cardDescription';
import useSaveSearch from '../hooks/useSaveSearch';

const PageMain = () => {
  function getUrlSearchPart(part: string) {
    return new URLSearchParams(location.search).get(part);
  }

  const [load, setLoad] = useState(true);
  const [updateCards, setUpdateCards] = useState(true);
  const [searchLS, setSearchLS] = useSaveSearch();
  const [page, setPage] = useState(Number(getUrlSearchPart('page')) && Number(getUrlSearchPart('page')) >= 1 ? Number(getUrlSearchPart('page')) : 1);
  const [search, setSearch] = useState(searchLS || getUrlSearchPart('search') || '');
  const [details, setDetails] = useState(getUrlSearchPart('details') || '');
  const [obj, setObj] = useState({});
  const [newPath, setNewPath] = useState(true);
  const [objDescription, setObjDescription] = useState({
    data: {
      imageUrl: '',
      name: '',
      sourceUrl: '',
      films: [''],
      tvShows: [''],
      shortFilms: [''],
      videoGames: [''],
    }
  });
  
  const serchInputRef = useRef(null);

  const updateUrlWithoutReload = useCallback(() => {
    history.pushState(null, '', `?page=${page}${search ? `&search=${search}` : ''}${details ? `&details=${details}` : ''}`);
  }, [page, search, details]);

  const createCards = useCallback(async () => {
    async function createPageCards() {
      const newObj = await getCharactersPageApi(page, 10);
      if (newObj) {
        setObj(newObj);
        setUpdateCards(false);
        setLoad(false);
      }
    }

    async function createSearchCards() {
      const newObj = await searchCharactersApi(search, page, 10);
      if (newObj) {
        setObj(newObj);
        setUpdateCards(false);
        setLoad(false);
      }
    }

    if (updateCards && load && search === '') createPageCards();
    if (updateCards && load && search !== '') createSearchCards();

    if (details) {
      const data = await getOneCharacterApi(Number(details));
      if (data) setObjDescription(data);
      setUpdateCards(false);
      setLoad(false);
    }

    if (newPath && location.search !== `?page=${page}${search ? `&search=${search}` : ''}${details ? `&search=${details}` : ''}`) updateUrlWithoutReload();
  }, [load, search, newPath, page, details, updateCards, updateUrlWithoutReload]);

  useEffect(() => {
    createCards();
  }, [load, createCards]);
  
  function changeSearchCharacters() {
    if (serchInputRef.current) {
      const input = serchInputRef.current as HTMLInputElement;
      const value = input.value.trim();
      if (value !== '') {
        setLoad(true);
        setNewPath(true);
        setSearch(value);
        setPage(1);
        setSearchLS(value);
        setUpdateCards(true);
      }
    }
  }

  function clearSearch() {
    const input = serchInputRef.current as HTMLInputElement | null;
    if (input) input.value = '';
    if (localStorage.searchHistory && input) {
      localStorage.removeItem('searchHistory');
      setLoad(true);
      setNewPath(true);
      setPage(1);
      setSearch('');
      setUpdateCards(true);
    }
  }

  function createError() {
    setObj({ data: { name: 'for error' } });
  }

  function changePage(value: number) {
    const changePageNumber = () => {
      setLoad(true);
      setUpdateCards(true);
      setPage(page + value);
    }

    if ('info' in obj && typeof obj.info === 'object' && obj.info) {
      if (value < 0 && 'previousPage' in obj.info && obj.info.previousPage) changePageNumber();
      if (value > 0 && 'nextPage' in obj.info && obj.info.nextPage) changePageNumber();
    }
  }

  async function showDescription(id: number) {
    const data = await getOneCharacterApi(id);
    if (data) setObjDescription(data);
    setLoad(true);
    setNewPath(true);
    setDetails(String(id));
  }

  function hideDescription() {
    setNewPath(true);
    setDetails('');
  }

  useEffect(() => {
    window.onpopstate = () => {
      setNewPath(false);
      setPage(Number(getUrlSearchPart('page') || 1));
      setSearch(getUrlSearchPart('search') || '');
      setDetails(getUrlSearchPart('details') || '');
      setUpdateCards(true);
      setLoad(true);
    };
  }, []);

  let cardCode: JSX.Element | null | object = null;
  if ('data' in obj) {
    const data = Array.isArray(obj.data) ? obj.data : [obj.data];

    cardCode = data.map((v) => (
      <Card
        key={v._id}
        id={v._id}
        image={v.imageUrl}
        name={v.name}
        films={v.films.join(', ')}
        showDescription={showDescription}
      />
    ));
  }

  const paginationCode = <Pagination
    key={3001}
    page={page}
    obj={obj}
    changePage={changePage}
  />

  const loading = <Loading />;

  const cardListCode = <CardList
    key={3002}
    cardCode={cardCode}
    createError={createError}
  />

  const searchCode = <Search
    key={3003}
    serchInputRef={serchInputRef}
    search={search}
    clearSearch={clearSearch}
    changeSearchCharacters={changeSearchCharacters}
  />

  const cardDescriptionCode = <CardDescription
    key={3004}
    image={objDescription.data.imageUrl}
    name={objDescription.data.name}
    films={objDescription.data.films.join(', ')}
    tvShows={objDescription.data.tvShows.join(', ')}
    shortFilms={objDescription.data.shortFilms.join(', ')}
    videoGames={objDescription.data.videoGames.join(', ')}
    hideDescription={hideDescription}
  />

  return (
    <div className="page-main">
      <div className='main-panel' onClick={() => hideDescription()}>
        <header className="page-main__header">
          {searchCode}
        </header>

        {cardListCode}
        {paginationCode}
        <Footer />

        {load ? loading : null}
      </div>
      
      {details ? cardDescriptionCode : null}
    </div>
  );
}

export default PageMain;
