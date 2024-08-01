import React from 'react';
import styles from '../styles/Category.module.css';
import Card from './Card'; // Ensure correct import path

const Category = ({ title, activities = [], currentIndex }) => {
  console.log('Category Title:', title);
  console.log('Current Index:', currentIndex);
  const categoryClass = title.toLowerCase(); // Assumes titles are 'Camp', 'Competition', 'Others'
  const currentActivity = activities[currentIndex] || {};

  return (
    <div className={`${styles.category} ${styles[categoryClass]}`}>
      <h2 className={styles.categoryTitle}>{title}</h2>
      {currentActivity.imageUrl && (
        <div className={styles.rectangle}>
          <Card
            title={currentActivity.name}
            category={title}
            description={currentActivity.description || "No description"}
            imageUrls={[currentActivity.imageUrl]}
            date={currentActivity.date || "No date"}
          />
        </div>
      )}
      {activities.length > 0 && (
        <div className={styles.activity}>
          <p>{currentActivity.name}</p>
        </div>
      )}
    </div>
  );
};

export default Category;
