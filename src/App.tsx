import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { PagesRouter } from './modules/pagesRouter';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ThemeContext from './components/themeContext';

const theme = {
  light: false,
  change: function() { this.light = !this.light },
}

const App = () => {
  return (
    <div data-testid={'App'}>
      <Provider store={store}>
        <ThemeContext.Provider value={theme}>
          <BrowserRouter>
            <PagesRouter />
          </BrowserRouter>
        </ThemeContext.Provider>
      </Provider>
    </div>
  );
}

export default App;
