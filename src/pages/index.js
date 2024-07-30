// pages/index.js
import Header from '../components/Header';
import Board from '../components/Board';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Board />
    </div>
  );
};

export default Home;
