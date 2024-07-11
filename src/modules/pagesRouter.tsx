import { Route, Routes } from 'react-router-dom';
import PageMain from '../pages/pageMain';

export const PagesRouter = () => {
    return (
      <Routes>
        <Route path="/" element={<PageMain/>} />
      </Routes>
    );
};