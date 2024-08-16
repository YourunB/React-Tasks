import './App.css';
import { PagesRouter } from './modules/pagesRouter';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <PagesRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
