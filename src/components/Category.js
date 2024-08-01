import React, { useState, useEffect } from 'react';
import styles from '../styles/Category.module.css';
import Card from './Card'; // Ensure correct import path

const Category = ({ activities = [], title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const categoryClass = title.toLowerCase(); // Ensure the class name is correctly assigned

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % activities.length);
    }, 25000); // Switch every 25 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [activities.length]);

  const currentActivity = activities[currentIndex] || {};

  return (
    <div className={`${styles.category} ${styles[categoryClass]}`}>
      <h2 className={styles.categoryTitle}>{title}</h2>
      {currentActivity.imageUrl && (
        <div className={styles.rectangle}>
          <Card
            title={currentActivity.title}
            category={currentActivity.category}
            imageUrls={[currentActivity.imageUrl]}
            deadline={currentActivity.deadline || "No deadline"}
            topic={currentActivity.topic || "No topic"}
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
