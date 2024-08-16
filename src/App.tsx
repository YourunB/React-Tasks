import './App.css';
import { PagesRouter } from './modules/pagesRouter';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/Header';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <PagesRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
