import React, { useRef, useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import styles from '../styles/Card.module.css';

const formatThaiDate = (dateString) => {
  if (!dateString) return "ไม่ระบุ"; // Return "ไม่ระบุ" if no dateString is provided
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "ไม่ระบุ"; // Return "ไม่ระบุ" if date is invalid
  const day = date.getDate();
  const month = date.toLocaleString('th-TH', { month: 'short' });
  const year = date.getFullYear() + 543; // Convert AD to BE
  return `${day} ${month} ${year}`;
};

const Card = ({ title, category, description, imageUrls, date, deadline, topic, link }) => {
  const topicRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const adjustFontSize = () => {
      const element = topicRef.current;
      if (!element) return; // Check if element is not null
      const parent = element.parentNode;
      const parentHeight = parent.clientHeight;
      const parentWidth = parent.clientWidth;
      let fontSize = parseInt(window.getComputedStyle(element).fontSize);
      const minFontSize = 12; // Minimum font size is 1.2rem (12px)

      element.style.fontSize = `${fontSize}px`;
      element.style.whiteSpace = 'nowrap';

      while ((element.scrollHeight > parentHeight || element.scrollWidth > parentWidth) && fontSize > minFontSize) {
        fontSize -= 1;
        element.style.fontSize = `${fontSize}px`;
      }

      element.style.whiteSpace = 'normal';

      while (element.scrollHeight <= parentHeight && element.scrollWidth <= parentWidth && fontSize < 100) {
        fontSize += 1;
        element.style.fontSize = `${fontSize}px`;
        if (element.scrollHeight > parentHeight || element.scrollWidth > parentWidth) {
          fontSize -= 1;
          element.style.fontSize = `${fontSize}px`;
          break;
        }
      }
    };

    if (isLoaded) {
      adjustFontSize();
      window.addEventListener('resize', adjustFontSize);
      return () => window.removeEventListener('resize', adjustFontSize);
    }
  }, [topic, isLoaded]);

  useEffect(() => {
    // Simulate data loading to ensure all data is available before rendering the specific elements
    setIsLoaded(true);
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.rectangle}>
        <div className={styles.bookmark}></div>
        {isLoaded && imageUrls && imageUrls.length > 0 && (
          <div className={styles.cardImageFrame}>
            <img src={imageUrls[0]} alt={title} className={styles.cardImage} />
          </div>
        )}
        {isLoaded && (
          <div className={styles.topicBox}>
            <span ref={topicRef} className={styles.topicText}>{topic || 'ไม่ระบุ'}</span>
          </div>
        )}
        <div className={styles.qrCodeBox}>
          {isLoaded && <p className={styles.cardDeadline}>ปิดรับสมัครวันที่ {formatThaiDate(deadline)}</p>}
          <div className={styles.scan}>scan here</div>
          {isLoaded && <QRCode value={link} size={128} />}
        </div>
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardCategory}>{category}</p>
      <p className={styles.cardDescription}>{description}</p>
      <p className={styles.cardDate}>{date}</p>
    </div>
  );
};

export default Card;
