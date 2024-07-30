// components/Card.js
import React from 'react';
import QRCode from 'qrcode.react';
import styles from '../styles/Card.module.css';

const Card = ({ title, category, description, imageUrl, date, qrCodeUrl }) => {
  return (
    <div className={`${styles.card} ${styles[category]}`}>
      <img src={imageUrl} alt={title} className={styles.image} />
      <h2>{title}</h2>
      <p>{description}</p>
      <p><strong>Date:</strong> {date}</p>
      <QRCode value={qrCodeUrl} size={100} className={styles.qrCode} />
    </div>
  );
};

export default Card;
