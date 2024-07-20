import './pageMain.css';
import Loading from '../components/loading';
import Footer from '../components/footer';
import Search from '../components/search';
import Card from '../components/card';
import CardList from '../components/cardList';
import { getCharactersPageApi } from '../modules/api';
import { useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCharacters, updateLoad } from '../redux/dataSlicePage';
import { RootState } from '../redux/store';

const PageMain = () => {
  const dispatch = useDispatch();
  const dataReduxPage = useSelector( (state: RootState) => state.dataPage );
  //const dataReduxCharacter = useSelector( (state: State) => state.dataCharacter );

  const createPageCards = useCallback(async () => {
      const characters = await getCharactersPageApi(dataReduxPage.page, 10);
      if (characters) {
        dispatch(updateCharacters(characters));
        dispatch(updateLoad(false));
    }
  }, [dataReduxPage.page, dispatch])  

  async function showDescription(id: number) {
    //const data = await getOneCharacterApi(id);
    //if (data) dataReduxCharacter.chartacterDescription(data);
    //setLoad(true);
    //setNewPath(true);
    //setDetails(String(id));
    console.log(id);
  }


  useEffect(() => {
    createPageCards();
  }, [createPageCards])



  function clearSearch() {
    console.log('changeSearchCharacters');
  }

  function changeSearchCharacters() {
    console.log('changeSearchCharacters');
  }

  function hideDescription() {
    console.log('hideDescription');
  }

  const serchInputRef = useRef(null);
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
  if ('data' in dataReduxPage.characters) {
    const data = Array.isArray(dataReduxPage.characters.data) ? dataReduxPage.characters.data : [dataReduxPage.characters.data];

    cardCode = data.map((character) => (
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

  return (
    <div className="page-main" data-testid={'page-main'}>
      <div className="main-panel" onClick={() => hideDescription()}>
        <header className="page-main__header">{searchCode}</header>
        {cardListCode}
        <Footer />

        {dataReduxPage.load ? <Loading /> : null}
      </div>
    </div>
  );
};

export default PageMain;
