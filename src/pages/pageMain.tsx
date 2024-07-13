import { useState, useRef, useEffect, useCallback } from 'react';
import './pageMain.css';
import { getCharactersPageApi, searchCharactersApi } from '../modules/api';
import Card from '../components/card';
import Loading from '../components/loading';
import Footer from '../components/footer';
import Pagination from '../components/pagination';
import CardList from '../components/cardList';
import Search from '../components/search';

const PageMain = () => {
  function getUrlPage() {
    return new URLSearchParams(location.search).get('page');
  }

  function getUrlSearch() {
    return new URLSearchParams(location.search).get('search');
  }

  const [search, setSearch] = useState(getUrlSearch() || '');
  const [load, setLoad] = useState(true);
  //const [firstLoad, setFirstLoad] = useState(true);
  const [page, setPage] = useState(Number(getUrlPage()) && Number(getUrlPage()) >= 1 ? Number(getUrlPage()) : 1);
  const [obj, setObj] = useState({});
  const [newPath, setNewPath] = useState(true);
  
  const serchInputRef = useRef(null);

  const updateUrlWithoutReload = useCallback(() => {
    history.pushState(null, '', `?page=${page}${search ? `&search=${search}` : ''}`);
  }, [page, search]);

  const createCards = useCallback(async () => {
    async function createPageCards() {
      const newObj = await getCharactersPageApi(page, 10);
      if (newObj) {
        setObj(newObj);
        setLoad(false);
      }
    }

    async function createSearchCards() {
      const newObj = await searchCharactersApi(search, page, 10);
      if (newObj) {
        setObj(newObj);
        setLoad(false);
      }
    }

    /*if (firstLoad && load && localStorage.searchHistory) {
      const arr = JSON.parse(localStorage.searchHistory) as string[];
      const input = serchInputRef.current as HTMLInputElement | null;
      if (input) {
        input.value = arr[arr.length - 1];
        setSearch(arr[arr.length - 1]);
        setFirstLoad(false);
        createSearchCards();
      }
    }

    if (firstLoad && load && !localStorage.searchHistory) {
      setFirstLoad(false);
      createPageCards();
    }*/
    
    if (load && search === '') createPageCards();
    if (load && search !== '') createSearchCards();

    if (newPath && location.search !== `?page=${page}${search ? `&search=${search}` : ''}`) updateUrlWithoutReload();
  }, [load, search, newPath, page, updateUrlWithoutReload]);

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
        saveSearchToLocalStoraage(value);
      }
    }
  }

  function saveSearchToLocalStoraage(value: string) {
    if (localStorage.searchHistory) {
      let arr = JSON.parse(localStorage.searchHistory) as string[];
      arr = arr.filter((el) => el !== value);
      arr.push(value);
      localStorage.searchHistory = JSON.stringify(arr);
    } else {
      const arr: string[] = [value];
      localStorage.searchHistory = JSON.stringify(arr);
    }
  }

  function clearSearch() {
    const input = serchInputRef.current as HTMLInputElement | null;
    if (input) {
      const value = input.value.trim();
      console.log(value);
      if (value === '')
        setLoad(true);
        setNewPath(true);
        setPage(1);
        setSearch('');
    }
  }

  function createError() {
    setObj({ data: { name: 'for error' } });
  }

  function changePage(value: number) {
    const changePageNumber = () => {
      setLoad(true);
      setPage(page + value);
    }

    if ('info' in obj && typeof obj.info === 'object' && obj.info) {
      if (value < 0 && 'previousPage' in obj.info && obj.info.previousPage) changePageNumber();
      if (value > 0 && 'nextPage' in obj.info && obj.info.nextPage) changePageNumber();
    }
  }

  window.onpopstate = () => {
    setNewPath(false);
    setPage(Number(getUrlPage() || 1));
    setSearch(getUrlSearch() || '');
    setLoad(true);

    console.log(location.search);
  };

  let cardCode: JSX.Element | null | object = null;
  if ('data' in obj) {
    const data = Array.isArray(obj.data) ? obj.data : [obj.data];

    cardCode = data.map((v) => (
      <Card
        key={v._id}
        image={v.imageUrl}
        name={v.name}
        films={v.films.join(', ')}
        tvShows={v.tvShows.join(', ')}
        games={v.videoGames.join(', ')}
        source={v.sourceUrl}
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

  return (
    <div className="page-main">
      <header className="page-main__header">
        {searchCode}
      </header>

      {cardListCode}
      {paginationCode}
      <Footer />

      {load ? loading : null}
    </div>
  );
}

export default PageMain;
