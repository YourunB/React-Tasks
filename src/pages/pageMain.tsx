import { useState, useRef, useEffect } from 'react';
import './pageMain.css';
import { getCharactersPageApi, searchCharactersApi } from '../modules/api';
import Card from '../components/card';
import React from 'react';
import Loading from '../components/loading';
import Footer from '../components/footer';

const PageMain = () => {
  const [search, setSearch] = useState('');
  const [load, setLoad] = useState(true);
  const [page, setPage] = useState(1);
  const [obj, setObj] = useState({});

  const serchInputRef = useRef(null);

  useEffect(() => {
    createCards();
  }, [load]);
  
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

  function firstCreateCards() {
    if (localStorage.searchHistory) {
      const arr = JSON.parse(localStorage.searchHistory) as string[];
      const input = serchInputRef.current as HTMLInputElement | null;
      if (input) {
        input.value = arr[arr.length - 1];
        setSearch(arr[arr.length - 1]);
        createCards();
      }
    } else createCards();
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

  async function createCards() {
    if (search === '' && load) {
      const newObj = await getCharactersPageApi(1, 500);
      if (newObj) {
        setObj(newObj);
        setLoad(false);
      }
    }
    if (search !== '' && load) {
      const newObj = await searchCharactersApi(search, 10);
      if (newObj) {
        setObj(newObj);
        setLoad(false);
      }
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
