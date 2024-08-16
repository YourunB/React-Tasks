import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from '../pages/PageNotFound';
import { PageHome } from '../pages/PageHome';
import { PageFormUncontrolled } from '../pages/PageFormUncontrolled';
import { PageFormHook } from '../pages/PageFormHook';

export const PagesRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PageHome />} />
      <Route path="/uncontrolled" element={<PageFormUncontrolled />} />
      <Route path="/controlled" element={<PageFormHook />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};
