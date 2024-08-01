import React, { useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import QRCode from 'qrcode.react';
import styles from '../styles/Card.module.css';

const formatThaiDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('th-TH', { month: 'short' });
  const year = date.getFullYear() + 543; // Convert AD to BE
  return `${day} ${month} ${year}`;
};

const Card = ({ title, category, description, imageUrls, date, deadline, topic, link }) => {
  const topicRef = useRef(null);

  useEffect(() => {
    const adjustFontSize = () => {
      const element = topicRef.current;
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

    adjustFontSize();
    window.addEventListener('resize', adjustFontSize);
    return () => window.removeEventListener('resize', adjustFontSize);
  }, [topic]);

  return (
    <div className={styles.card}>
      {imageUrls && imageUrls.length > 0 && (
        <div className={styles.cardImageFrame}>
          <img src={imageUrls[0]} alt={title} className={styles.cardImage} />
        </div>
      )}
      <div className={styles.topicBox}>
        <span ref={topicRef} className={styles.topicText}>{topic}</span>
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardCategory}>{category}</p>
      <p className={styles.cardDescription}>{description}</p>
      <p className={styles.cardDate}>{date}</p>
      <div className={styles.qrCodeBox}>
      <p className={styles.cardDeadline}>ปิดรับสมัครวันที่ {formatThaiDate(deadline)}</p>
        <div className={styles.scan}>scan here</div>
        <QRCode value={link} size={128} />
      </div>
    </div>
  );
};

export default Card;
