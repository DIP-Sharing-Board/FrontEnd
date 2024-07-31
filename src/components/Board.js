import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Category from '../components/Category';
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
      console.log(`Fetching activities for: ${type} from ${url}`);
      const response = await axios.get(url);
      console.log(`Data for ${type}:`, response.data);
      return response.data;
    } catch (err) {
      console.error(`Failed to fetch ${type} activities: ${err.message}`);
      throw err;
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

        console.log('Fetched Data:', { campData, competitionData, otherData });

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
        console.error('Error fetching all activities:', err);
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

  console.log('Activities:', activities);

  return (
    <div className={styles.board}>
      {['camp', 'competition', 'other'].map((category) => (
        <div key={category} className={styles.category}>
          <Category
            title={category.charAt(0).toUpperCase() + category.slice(1)}
            category={category}
            activities={activities[category] || []}
            imageUrl={category === 'other' && activities.other.length > 0 ? activities.other[0].imageUrl : null}
          />
        </div>
      ))}
    </div>
  );
};

export default Board;
