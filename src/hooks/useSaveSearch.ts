import { useState, useEffect } from 'react';

function useSaveSearch() {
  const [search, setSearch] = useState(getSearchValue);

  useEffect(() => {
    setSearchValueToLocalStorage(search);
  }, [search]);

  function getSearchValue() {
    return localStorage.searchHistory ? localStorage.searchHistory : '';
  }

  function setSearchValueToLocalStorage(value: string): void {
    localStorage.searchHistory = value;
  }

  return [search, setSearch];
}

export default useSaveSearch;