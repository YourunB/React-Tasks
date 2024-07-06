import { Component } from 'react';
import './pageMain.css';
import { getCharactersPageApi, searchCharactersApi } from '../modules/api';
import CardCharacter from '../components/cardCharacter';
import React from 'react';
import { DisneyObject } from '../state/types';

class PageMain extends Component {
  state = {
    search: '',
    page: 1,
    obj: {} as DisneyObject,
  };

  serchInputRef = React.createRef();

  componentDidMount(): void {
    this.firstCreateCards();
  }

  changeSearchCharacters() {
    const input = this.serchInputRef.current as HTMLInputElement;
    const value = input.value.trim();
    if (value !== '') {
      this.setState({
        search: value,
      }, this.createCards);
      this.saveSearchToLocalStoraage(value);
    }
  }

  saveSearchToLocalStoraage(value: string) {
    if (localStorage.searchHistory) {
      const arr = JSON.parse(localStorage.searchHistory);
      arr.push(value);
      localStorage.searchHistory = JSON.stringify(Array.from(new Set(arr)));
    } else {
      const arr: string[] = [value];
      localStorage.searchHistory = JSON.stringify(arr);
    };
  }

  firstCreateCards() {
    if (localStorage.searchHistory) {
      const arr = JSON.parse(localStorage.searchHistory) as string[];
      const input = this.serchInputRef.current as HTMLInputElement;
      input.value = arr[arr.length - 1];
      this.setState({search: arr[arr.length - 1]}, this.createCards);
    } else this.createCards();
  }

  clearSearch() {
    const input = this.serchInputRef.current as HTMLInputElement;
    const value = input.value.trim();
    if (value === '') this.setState({
      search: '',
    }, this.createCards);
  }

  async createCards() {
    if (this.state.search === '') {
      this.setState({
        obj: await getCharactersPageApi(1, 500),
      });
    } else {
      this.setState({
        obj: await searchCharactersApi(this.state.search, 10),
      });
    }
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
        
        <header className='page-main__header'>
          <div className='search'>
            <input onInput={() => this.clearSearch()} ref={this.serchInputRef as React.LegacyRef<HTMLInputElement>} className='search__input' placeholder='Search...'></input>
            <button onClick={() => this.changeSearchCharacters()} className='search__btn'>Search</button>
          </div>
        </header>

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
