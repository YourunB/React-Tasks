import { Route, Routes } from 'react-router-dom';
import PageMain from '../pages/pageMain';
import PageNotFound from '../pages/pageNotFound';

export const PagesRouter = () => {
    return (
      <Routes>
        <Route path="/" element={<PageMain/>} />
        <Route path="/*" element={<PageNotFound/>} />
      </Routes>
    );
};