import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { PagesRouter } from './modules/pagesRouter';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {
  return (
    <div data-testid={'App'}>
      <Provider store={store}>
        <BrowserRouter>
          <PagesRouter />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
