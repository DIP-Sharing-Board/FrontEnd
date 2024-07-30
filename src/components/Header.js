// components/Header.js
import React from 'react';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div ClassName={styles.title}>DIP Sharing Board</div>
      <nav>
        <ul>
          <li>Camp</li>
          <li>Competition</li>
          <li>Others</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
