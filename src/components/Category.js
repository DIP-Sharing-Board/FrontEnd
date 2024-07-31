import React from 'react';
import styles from '../styles/Category.module.css';
import Card from './Card'; // Ensure correct import path

const Category = ({ title, activities = [], imageUrl }) => {
  console.log('Category Title:', title);
  console.log('Image URL:', imageUrl);
  const categoryClass = title.toLowerCase(); // Assumes titles are 'Camp', 'Competition', 'Others'

  return (
    <div className={`${styles.category} ${styles[categoryClass]}`}>
      <h2 className={styles.categoryTitle}>{title}</h2>
      {categoryClass === 'other' && imageUrl && (
        <div className={styles.rectangle}>
          <Card
            title="Other Activities"
            category="Others"
            description="Activities under the Others category"
            imageUrls={[imageUrl]}
            date="2023-01-01"
          />
        </div>
      )}
      {activities.length > 0 && (
        activities.map((activity, index) => (
          <div key={index} className={styles.activity}>
            <p>{activity.name}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Category;
