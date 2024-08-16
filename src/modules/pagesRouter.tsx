import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from '../pages/PageNotFound';
import { PageHome } from '../pages/PageHome';
import { PageFormUncontrolled } from '../pages/PageFormUncontrolled';
import { PageFormHook } from '../pages/PageFormHook';

export const PagesRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PageHome />} />
      <Route path="/form1" element={<PageFormUncontrolled />} />
      <Route path="/form2" element={<PageFormHook />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};
