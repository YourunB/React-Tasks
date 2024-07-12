import { useState, useRef, useEffect, useCallback } from 'react';
import './pageMain.css';
import { getCharactersPageApi, searchCharactersApi } from '../modules/api';
import Card from '../components/card';
import React from 'react';
import Loading from '../components/loading';
import Footer from '../components/footer';

const PageMain = () => {
  const [search, setSearch] = useState('');
  const [load, setLoad] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  //const [page, setPage] = useState(1);
  const [obj, setObj] = useState({});

  const serchInputRef = useRef(null);

  const createCards = useCallback(async () => {
    async function createPageCards() {
      const newObj = await getCharactersPageApi(1, 500);
      if (newObj) {
        setObj(newObj);
        setLoad(false);
      }
    }

    async function createSearchCards() {
      const newObj = await searchCharactersApi(search, 10);
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
  }, [firstLoad, load, search]);

  useEffect(() => {
    createCards();
  }, [load, createCards]);
  
  function changeSearchCharacters() {
    if (serchInputRef.current) {
      setLoad(true);
      const input = serchInputRef.current as HTMLInputElement;
      const value = input.value.trim();
      if (value !== '') {
        setSearch(value);
        createCards();
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
      if (value === '')
        setLoad(true);
        setSearch('');
        createCards();
    }
  }

  function createError() {
    setObj({ data: { name: 'for error' } });
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
          ></input>
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

      <Footer />

      {load ? loading : null}
    </div>
  );
}

export default PageMain;
