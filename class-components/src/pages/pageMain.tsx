import { Component } from 'react';
import './pageMain.css';
import { getCharactersPageApi, searchCharactersApi } from '../modules/api';
import CardCharacter from '../components/cardCharacter';
import { DisneyObject } from '../state/types';

class PageMain extends Component {
  state = {
    search: '',
    page: 1,
    obj: {} as DisneyObject,
  };

  componentDidMount(): void {
    this.firstCreateCards();
  }

  async firstCreateCards() {
    this.setState({
      obj: await getCharactersPageApi(1, 500),
    });
  }

  render() {
    let cardCode = null;
    if ('data' in this.state.obj) {
      const data = Array.isArray(this.state.obj.data)
        ? this.state.obj.data
        : [this.state.obj.data];
    
      cardCode = data.map(v => (
        <CardCharacter
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

    return (
      <div className='page-main'>

        <main className='page-main__main'>
          <h1>Disney Characters</h1>
          <section className='cards'>
            {cardCode}
          </section>
        </main>
      </div>
    );
  }
}

export default PageMain
