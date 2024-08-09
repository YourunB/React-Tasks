import Head from "next/head";
import s from "@/styles/Home.module.css";
import PageMain from "@/components/pageMain";

export default function Home() {
  return (
    <>
      <Head>
        <title>Rock and Morty</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        <PageMain />
      </main>
    </>
  );
}
