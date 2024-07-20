import './pageMain.css';
import Footer from '../components/footer';
import Search from '../components/search';
import Card from '../components/card';
import CardList from '../components/cardList';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updatePage, useGetCharactersApiQuery } from '../redux/dataSlicePage';
import { Character } from '../state/types';

const PageMain = () => {
  const dispatch = useDispatch();
  const dataReduxPage = useSelector( (state: RootState) => state.dataPage );
  //const dataReduxCharacter = useSelector( (state: State) => state.dataCharacter );

  const dataCharacters = useGetCharactersApiQuery(dataReduxPage.page);

  async function showDescription(id: number) {
    dispatch(updatePage(2));
    console.log('showDescription');
  }

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
  if (dataCharacters.data) {
    console.log(dataCharacters.data.data);
    cardCode = dataCharacters.data.data.map((character: Character) => (
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
      </div>
    </div>
  );
};

export default PageMain;
