import React from 'react';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
      <div className={styles.header}>
        <h1>DIP Sharing Board</h1>
        <div className={styles.flagContainer}>
        <div className={styles.blueflag}>
          <img src="/blueflag.svg" alt="Blue Flag" />
        </div>
        <div className={styles.redflag}>
          <img src="/redflag.svg" alt="Red Flag" />
        </div>
        <div className={styles.yellowflag}>
          <img src="/yellowflag.svg" alt="Yellow Flag" />
        </div>
      </div>
      </div>
  );
};

export default Header;
