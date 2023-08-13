import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import MovieTitles from "../components/movieTitles";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gamanza Movie titles</title>
        <meta name="description" content="Get all movie titles from Gamanza" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="">Gamanza's studios!</a>
        </h1>
        <MovieTitles />
      </main>

      <footer className={styles.footer}>
        <a href="" target="_blank" rel="noopener noreferrer">
          Powered by Gamanza movies
        </a>
      </footer>
    </div>
  );
};

export default Home;
