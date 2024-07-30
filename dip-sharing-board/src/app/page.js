"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=TH+Sarabun+New:wght@400;700&display=swap');

  body {
    font-family: 'TH Sarabun New', sans-serif;
  }
`;
    
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className={styles.descriptionp}>DIP Sharing Board</div>
      </div>
      <div className={styles.description1}>Camp</div>
      <div className={styles.description2}>Competition</div>
      <div className={styles.description3}>Others</div>
      <div className={styles.center}>
          <Image
            className={styles.logo}
            src="campcard.svg"
            alt="Next.js Logo"
            width={600}
            height={37}
            priority
          />
          <Image
            className={styles.under}
            src="campunder.svg"
            alt="Next.js Logo"
            width={600}
            height={37}
            priority
          />
          <Image
            className={styles.logo1}
            src="competitioncard.svg"
            alt="Next.js Logo"
            width={600}
            height={37}
            priority
          />
          <Image
            className={styles.under1}
            src="competitionunder.svg"
            alt="Next.js Logo"
            width={600}
            height={37}
            priority
          />
          <Image
            className={styles.logo2}
            src="otherscard.svg"
            alt="Next.js Logo"
            width={600}
            height={37}
            priority
          />
          <Image
            className={styles.under2}
            src="othersunder.svg"
            alt="Next.js Logo"
            width={600}
            height={37}
            priority
          />
      </div>
    </main>
  );
}
