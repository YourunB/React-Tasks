import { useState, useRef, useEffect, useCallback } from 'react';
import './pageMain.css';
import { getCharactersPageApi, searchCharactersApi } from '../modules/api';
import Card from '../components/card';
import React from 'react';
import Loading from '../components/loading';
import Footer from '../components/footer';

const PageMain = () => {
  function getUrlPage() {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');
    return page;
  }

  function getUrlSearch() {
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search');
    return search;
  }

  const [search, setSearch] = useState(getUrlSearch() || '');
  const [load, setLoad] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const [page, setPage] = useState(Number(getUrlPage()) && Number(getUrlPage()) >= 1 ? Number(getUrlPage()) : 1);
  const [obj, setObj] = useState({});
  
  const serchInputRef = useRef(null);

  function updateUrlWithoutReload() {
    history.pushState(null, '', `?page=${page}${search ? `&search=${search}` : ''}`);
  }

  updateUrlWithoutReload();

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

    if (firstLoad && load && localStorage.searchHistory) {
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
    }
    
    if (!firstLoad && load && search === '') createPageCards();
    if (!firstLoad && load && search !== '') createSearchCards();

    updateUrlWithoutReload();
  }, [load, search]);

  useEffect(() => {
    createCards();
  }, [load, createCards]);
  
  function changeSearchCharacters() {
    if (serchInputRef.current) {
      const input = serchInputRef.current as HTMLInputElement;
      const value = input.value.trim();
      if (value !== '') {
        setSearch(value);
        setPage(1);
        setLoad(true);
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
        setPage(1);
        setSearch('');
    }
  }

  function createError() {
    setObj({ data: { name: 'for error' } });
  }

  function changePage(value: number) {
    const changePageNumber = () => {
      setPage(page + value);
      setLoad(true);
    }

    if ('info' in obj && typeof obj.info === 'object' && obj.info) {
      if (value < 0 && 'previousPage' in obj.info && obj.info.previousPage) changePageNumber();
      if (value > 0 && 'nextPage' in obj.info && obj.info.nextPage) changePageNumber();
    }
  }

  /*useEffect(() => {
    location.search = `?page=${page}${search ? `&search=${search}` : ''}`;
  },[location.search])*/

  const Pagination = () => {
    let disableBtnPrev = true;
    let disableBtnNext = true;
    if ('info' in obj && typeof obj.info === 'object' && obj.info && 'previousPage' in obj.info && 'nextPage' in obj.info) {
      if (obj.info.previousPage) disableBtnPrev = false;
      if (obj.info.nextPage) disableBtnNext = false;
    }

    return (
      <div className='pagination'>
      <button onClick={() => changePage(-1)} disabled={disableBtnPrev}>Prev</button>
      <span>{page}</span>
      <button onClick={() => changePage(+1)} disabled={disableBtnNext}>Next</button>
    </div>
    );
  }

  let cardCode = null;
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

  const loading = <Loading />;

  return (
    <div className="page-main">
      <header className="page-main__header">
        <div className="search">
          <input
            onInput={() => clearSearch()}
            ref={serchInputRef as React.LegacyRef<HTMLInputElement>}
            className="search__input"
            placeholder="Search..."
            defaultValue={search}
          />
          <button onClick={() => changeSearchCharacters()} className="search__btn">
            Search
          </button>
        </div>
      </header>

      <main className="page-main__main">
        <button className="btn-error" onClick={() => createError()}>
          Error
        </button>
        <h1>Disney Characters</h1>
        <section className="cards">{cardCode}</section>
      </main>

      <Pagination />

      <Footer />

      {load ? loading : null}
    </div>
  );
}

export default PageMain;
