import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import styles from '../styles/Board.module.css';

const Board = () => {
  const [activities, setActivities] = useState({
    camp: [],
    competition: [],
    other: [],
  });
  const [updatedAt, setUpdatedAt] = useState({
    camp: null,
    competition: null,
    other: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivities = async (type, lastUpdatedAt) => {
    try {
      const url = lastUpdatedAt 
        ? `http://localhost:5000/api/v1/activities?type=${type}&updatedAt=${lastUpdatedAt}`
        : `http://localhost:5000/api/v1/activities?type=${type}`;
      const response = await axios.get(url);
      console.log(response.data.data)
      return response.data;
    } catch (err) {
      throw new Error(`Failed to fetch ${type} activities: ${err.message}`);
    }
  };

  useEffect(() => {
    const fetchAllActivities = async () => {
      try {
        const [campData, competitionData, otherData] = await Promise.all([
          fetchActivities('camp', updatedAt.camp),
          fetchActivities('competition', updatedAt.competition),
          fetchActivities('other', updatedAt.other),
        ]);

        setActivities({
          camp: campData.activities || [],
          competition: competitionData.activities || [],
          other: otherData.activities || [],
        });

        setUpdatedAt({
          camp: campData.updatedAt,
          competition: competitionData.updatedAt,
          other: otherData.updatedAt,
        });

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAllActivities();
    const interval = setInterval(fetchAllActivities, 10000);

    return () => clearInterval(interval);
  }, [updatedAt]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.board}>
      {['camp', 'competition', 'other'].map((category) => (
        <div key={category} className={styles.category}>
          <h2 className={styles.categoryTitle}>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
          {activities[category] && activities[category].map((activity, index) => (
            <Card
              key={index}
              title={activity.title}
              category={category}
              description={activity.description}
              imageUrl={activity.imageUrl}
              date={activity.date}
              qrCodeUrl={activity.qrCodeUrl}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
