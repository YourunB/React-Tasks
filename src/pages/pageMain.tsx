import './pageMain.css';
import Footer from '../components/footer';
import Search from '../components/search';
import Card from '../components/card';
import CardList from '../components/cardList';
import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updatePage, updateTotalPages, updateSearch, useGetCharactersApiQuery } from '../redux/dataSlicePage';
import { Character } from '../state/types';
import Pagination from '../components/pagination';
import Loading from '../components/loading';

const PageMain = () => {
  const dispatch = useDispatch();
  const serchInputRef = useRef(null);
  const dataReduxPage = useSelector( (state: RootState) => state.dataPage );
  const dataCharacters = useGetCharactersApiQuery({page: dataReduxPage.page, search: dataReduxPage.search});
  
  useEffect(() => {
    if (dataCharacters.data && dataCharacters.data.info) dispatch(updateTotalPages(dataCharacters.data.info.totalPages));
  }, [dataCharacters])

  async function showDescription(id: number) {
    console.log(dataCharacters);
    console.log('showDescription');
  }

  function clearSearch() {
    const input = serchInputRef.current as HTMLInputElement | null;
    if (input) input.value = '';
    dispatch(updatePage(1));
    dispatch(updateSearch(''));
  }

  function changeSearchCharacters() {
    if (serchInputRef.current) {
      const input = serchInputRef.current as HTMLInputElement;
      const value = input.value.trim();
      if (value !== '') {
        dispatch(updatePage(1));
        dispatch(updateSearch(value))
      }
    }
  }

  function hideDescription() {
    console.log('hideDescription');
  }

  function changePage(value: number) {
    dispatch(updatePage(dataReduxPage.page + value));
    dispatch(updateTotalPages(dataCharacters.data.info.totalPages));
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
        showDescription={showDescription}
      />
    ));
  }
  
  const cardListCode = <CardList key={3002} cardCode={cardCode} />;
  const paginationCode = <Pagination key={3001} page={dataReduxPage.page} btnPrevIsDisabled={dataReduxPage.page > 1 ? false : true} btnNextIsDisabled={dataReduxPage.page < dataReduxPage.totalPages ? false : true} changePage={changePage} />;
  
  return (
    <div className="page-main" data-testid={'page-main'}>
      <div className="main-panel" onClick={() => hideDescription()}>
        <header className="page-main__header">{searchCode}</header>
        {dataCharacters.isLoading ? <Loading /> : cardListCode}
        {paginationCode}
        <Footer />
      </div>
    </div>
  );
};

export default PageMain;
