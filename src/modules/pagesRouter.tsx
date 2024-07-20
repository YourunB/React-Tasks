import { Route, Routes } from 'react-router-dom';
import PageMain from '../pages/pageMain';
import PageNotFound from '../pages/pageNotFound';
import CardDescription from '../components/cardDescription';

export const PagesRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PageMain />}>
        <Route path="details/:id" element={<CardDescription />} />
      </Route>
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};
