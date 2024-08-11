import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useSearchParams } from "@remix-run/react";
import s from '../styles/_index.module.css'
import ThemeContext from '../components/themeContext';
import { useContext } from 'react';
import Footer from "../components/footer";

export const meta: MetaFunction = () => {
  return [
    { title: "Rick and Morty" },
    { name: "description", content: "Rick and Morty characters" },
  ];
};

export default function Index() {
  const theme = useContext(ThemeContext);

  const seacrh = useSearchParams();
  console.log(seacrh)
  return (
    <div className={`${s['page-main']} ${theme.light ? s['light'] : ''}`} data-testid={'page-main'}>
      <Footer />
    </div>
  );
}
