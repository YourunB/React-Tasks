import './pageMain.css';
import Footer from '../components/footer';
import Search from '../components/search';
import Card from '../components/card';
import CardList from '../components/cardList';
import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updatePage, updateTotalPages, updateSearch } from '../redux/dataSlicePage';
import { useGetCharactersApiQuery, useGetDetailsApiQuery } from '../redux/api/api';
import { Character } from '../state/types';
import Pagination from '../components/pagination';
import Loading from '../components/loading';
import { updateId } from '../redux/dataSliceCharacter';
import CardDescription from '../components/cardDescription';

const PageMain = () => {
  const dispatch = useDispatch();
  const serchInputRef = useRef(null);
  const dataReduxPage = useSelector( (state: RootState) => state.dataPage );
  const dataReduxDetails = useSelector( (state: RootState) => state.dataCharacter );
  const dataCharacters = useGetCharactersApiQuery({page: dataReduxPage.page, search: dataReduxPage.search});
  const dataDetails = useGetDetailsApiQuery(dataReduxDetails.id);

  useEffect(() => {
    if (dataCharacters.data && dataCharacters.data.info) dispatch(updateTotalPages(dataCharacters.data.info.totalPages));
  }, [dataCharacters, dispatch])

  function showDescription(id: number) {
    dispatch(updateId(id));
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
  
  console.log(dataDetails.data);

  const cardDetails = dataDetails.data && 'data' in dataDetails.data && 'name' in dataDetails.data.data ? (
    <CardDescription
      key={3004}
      image={dataDetails.data.data.imageUrl}
      name={dataDetails.data.data.name}
      films={dataDetails.data.data.films.join(', ')}
      tvShows={dataDetails.data.data.tvShows.join(', ')}
      shortFilms={dataDetails.data.data.shortFilms.join(', ')}
      videoGames={dataDetails.data.data.videoGames.join(', ')}
      hideDescription={hideDescription}
    />
  ) : null;

  return (
    <div className="page-main" data-testid={'page-main'}>
      <div className="main-panel" onClick={() => hideDescription()}>
        <header className="page-main__header">{searchCode}</header>
        {cardListCode}
        {paginationCode}
        {dataCharacters.isLoading || dataCharacters.isFetching || dataDetails.isLoading || dataDetails.isFetching ? <Loading /> : null}
        <Footer />
      </div>
      {cardDetails}
    </div>
  );
};

export default PageMain;
