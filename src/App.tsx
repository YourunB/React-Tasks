import './App.css';
import { PagesRouter } from './modules/pagesRouter';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/Header';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <PagesRouter />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
