import React from 'react';
import styles from '../styles/Card.module.css';

const Card = ({ title, category, description, imageUrls, date }) => {
  return (
    <div className={styles.card}>
      {imageUrls && imageUrls.length > 0 && (
        <img src={imageUrls[0]} alt={title} className={styles.cardImage} />
      )}
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardCategory}>{category}</p>
      <p className={styles.cardDescription}>{description}</p>
      <p className={styles.cardDate}>{date}</p>
    </div>
  );
};

export default Card;
