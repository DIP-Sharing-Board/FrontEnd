// components/Board.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import styles from '../styles/Board.module.css';

const Board = () => {
  const [campActivities, setCampActivities] = useState([]);
  const [competitionActivities, setCompetitionActivities] = useState([]);
  const [othersActivities, setOthersActivities] = useState([]);
  const [campUpdatedAt, setCampUpdatedAt] = useState(null);
  const [competitionUpdatedAt, setCompetitionUpdatedAt] = useState(null);
  const [othersUpdatedAt, setOthersUpdatedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async (type, updatedAt, setActivities, setUpdatedAt) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/activities?type=${type}&updatedAt=${updatedAt}`);
        setActivities(response.data.activities);
        setUpdatedAt(response.data.updatedAt);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchAllActivities = () => {
      fetchActivities('camp', campUpdatedAt, setCampActivities, setCampUpdatedAt);
      fetchActivities('competition', competitionUpdatedAt, setCompetitionActivities, setCompetitionUpdatedAt);
      fetchActivities('others', othersUpdatedAt, setOthersActivities, setOthersUpdatedAt);
      setLoading(false);
    };

    fetchAllActivities();
    const interval = setInterval(fetchAllActivities, 10000);

    return () => clearInterval(interval);
  }, [campUpdatedAt, competitionUpdatedAt, othersUpdatedAt]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.board}>
      <div className={styles.category}>
        <h2 className={styles.categoryTitle}>Camp</h2>
        {campActivities.map((activity, index) => (
          <Card
            key={index}
            title={activity.title}
            category="camp"
            description={activity.description}
            imageUrl={activity.imageUrl}
            date={activity.date}
            qrCodeUrl={activity.qrCodeUrl}
          />
        ))}
      </div>

      <div className={styles.category}>
        <h2 className={styles.categoryTitle}>Competition</h2>
        {competitionActivities.map((activity, index) => (
          <Card
            key={index}
            title={activity.title}
            category="competition"
            description={activity.description}
            imageUrl={activity.imageUrl}
            date={activity.date}
            qrCodeUrl={activity.qrCodeUrl}
          />
        ))}
      </div>

      <div className={styles.category}>
        <h2 className={styles.categoryTitle}>Others</h2>
        {othersActivities.map((activity, index) => (
          <Card
            key={index}
            title={activity.title}
            category="others"
            description={activity.description}
            imageUrl={activity.imageUrl}
            date={activity.date}
            qrCodeUrl={activity.qrCodeUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
