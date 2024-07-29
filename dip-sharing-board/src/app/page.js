import Image from "next/image";
import styles from "./page.module.css";

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
          className={styles.logo1}
          src="competitioncard.svg"
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
      </div>
    </main>
  );
}
