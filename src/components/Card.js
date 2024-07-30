import React from 'react';
import QRCode from 'qrcode.react';
import styles from '../styles/Card.module.css';

const Card = ({ title, category, description, imageUrl, date, qrCodeUrl }) => {
  return (
    <div className={`${styles.card} ${styles[category]}`} style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
      <img src={imageUrl || 'default-image-url.jpg'} alt={title || 'No Title'} className={styles.image} style={{ width: '100px', height: '100px' }} />
      <h2>{title || 'No Title'}</h2>
      <p>{description || 'No Description'}</p>
      <p><strong>Date:</strong> {date || 'No Date'}</p>
      <QRCode value={qrCodeUrl || 'default-url'} size={100} className={styles.qrCode} />
    </div>
  );
};

export default Card;
