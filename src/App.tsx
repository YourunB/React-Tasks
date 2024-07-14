import { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { PagesRouter } from './modules/pagesRouter';

class App extends Component {
  render() {
    return (
      <div data-testid={'App'}>
        <BrowserRouter>
          <PagesRouter />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
