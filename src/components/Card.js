import React, { useState, useEffect } from 'react';
import styles from '../styles/Card.module.css';

const Card = ({ title, category, description, imageUrls, date }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (imageUrls && imageUrls.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
      }, 20000); // Change image every 20 seconds

      return () => clearInterval(interval);
    }
  }, [imageUrls]);

  return (
    <div className={styles.card}>
      {imageUrls && imageUrls.length > 0 && (
        <img src={imageUrls[currentImageIndex]} alt={image} className={styles.cardImage} />
      )}
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardCategory}>{category}</p>
      <p className={styles.cardDescription}>{description}</p>
      <p className={styles.cardDate}>{date}</p>
    </div>
  );
};

export default Card;
