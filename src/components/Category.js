import React, { useState, useEffect } from 'react';
import styles from '../styles/Category.module.css';
import Card from './Card';

const Category = ({ activities = [], title, currentIndex }) => {
  const categoryClass = title.toLowerCase();

  useEffect(() => {
    console.log(`Rendering Category: ${title} with activities:`, activities);
    console.log(`Current index for ${title}:`, currentIndex);
  }, [activities, currentIndex, title]);

  const currentActivity = activities[currentIndex] || {};

  return (
    <div className={`${styles.category} ${styles[categoryClass]}`}>
      <h2 className={styles.categoryTitle}>{title}</h2>
      <div className={styles.rectangle}>
        <div className={styles.redflag}>
          <img src="/redflag.svg" alt="Red Flag" />
        </div>
        <div className={styles.blueflag}>
          <img src="/blueflag.svg" alt="Blue Flag" />
        </div>
        {currentActivity.imageUrl ? (
          <Card
            title={currentActivity.title}
            category={currentActivity.category}
            imageUrls={[currentActivity.imageUrl]}
            deadline={currentActivity.deadline || "No deadline"}
            topic={currentActivity.topic || "No topic"}
            link={currentActivity.link}
          />
        ) : (
          <p>No activities available</p>
        )}
      </div>
      {activities.length > 0 && (
        <div className={styles.activity}>
          <p>{currentActivity.name}</p>
        </div>
      )}
    </div>
  );
};

export default Category;
