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
  const [currentIndices, setCurrentIndices] = useState({
    camp: 0,
    competition: 0,
    other: 0,
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

        // Limit each category to the 20 latest entries
        setActivities({
          camp: (campData.data || []).slice(-20),
          competition: (competitionData.data || []).slice(-20),
          other: (otherData.data || []).slice(-20),
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

  useEffect(() => {
    const switchInterval = setInterval(() => {
      setCurrentIndices((prevIndices) => ({
        camp: activities.camp.length > 0 ? (prevIndices.camp + 1) % activities.camp.length : 0,
        competition: activities.competition.length > 0 ? (prevIndices.competition + 1) % activities.competition.length : 0,
        other: activities.other.length > 0 ? (prevIndices.other + 1) % activities.other.length : 0,
      }));
    }, 20000); // Switch every 20 seconds

    return () => clearInterval(switchInterval);
  }, [activities]);

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
        <div key={category}>
          <Category
            title={category.charAt(0).toUpperCase() + category.slice(1)}
            activities={activities[category] || []} // Ensure activities is always an array
            currentIndex={currentIndices[category]} // Pass the current index for switching
          />
        </div>
      ))}
    </div>
  );
};

export default Board;