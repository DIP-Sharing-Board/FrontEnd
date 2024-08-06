import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Category from '../components/Category';
import styles from '../styles/Board.module.css';
import { matchInstagramImage } from './matchInstagramImage';

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
  const [error, setError] = useState(null);
  const [initialFetch, setInitialFetch] = useState(false);

  const fetchActivities = async (type, lastUpdatedAt) => {
    try {
      const url = lastUpdatedAt
        ? `http://localhost:5000/api/v1/activities?type=${type}&updatedAt=${lastUpdatedAt}`
        : `http://localhost:5000/api/v1/activities?type=${type}`;
      console.log(`Fetching activities for: ${type} from ${url}`);
      const response = await axios.get(url);
      console.log(`Data for ${type}:`, response.data);

      // update instagram url to calling stream-image service *Avoid CORS*
      response.data.data = response.data.data.map((data) => {
        if (matchInstagramImage(data.imageUrl)) {
          return {
            ...data,
            imageUrl: `http://localhost:3000/stream-image?url=${encodeURIComponent(data.imageUrl)}`
          }
        } else return data
      }
      )
      console.log(response.data.data)

      return response.data;
    } catch (err) {
      console.error(`Failed to fetch ${type} activities: ${err.message}`);
      throw err;
    }
  };

  useEffect(() => {
    const fetchAllActivities = async () => {
      try {
        console.log("Fetching all activities...");
        const [campData, competitionData, otherData] = await Promise.all([
          fetchActivities('camp', updatedAt.camp),
          fetchActivities('competition', updatedAt.competition),
          fetchActivities('other', updatedAt.other),
        ]);

        console.log('Fetched Data:', { campData, competitionData, otherData });

        setActivities({
          camp: (campData.data || []).filter(activity => activity.imageUrl).slice(-20),
          competition: (competitionData.data || []).filter(activity => activity.imageUrl).slice(-20),
          other: (otherData.data || []).filter(activity => activity.imageUrl).slice(-20),
        });

        setUpdatedAt({
          camp: campData.updatedAt,
          competition: competitionData.updatedAt,
          other: otherData.updatedAt,
        });

        setInitialFetch(true);
      } catch (err) {
        console.error('Error fetching all activities:', err);
        setError(err.message);
      }
    };

    fetchAllActivities();
    const fetchInterval = setInterval(fetchAllActivities, 30000);

    return () => clearInterval(fetchInterval);
  }, []);

  useEffect(() => {
    if (initialFetch) {
      const switchInterval = setInterval(() => {
        setCurrentIndices((prevIndices) => ({
          camp: activities.camp.length > 0 ? (prevIndices.camp + 1) % activities.camp.length : 0,
          competition: activities.competition.length > 0 ? (prevIndices.competition + 1) % activities.competition.length : 0,
          other: activities.other.length > 0 ? (prevIndices.other + 1) % activities.other.length : 0,
        }));
        console.log('Switched indices:', currentIndices);
      }, 25000);

      return () => clearInterval(switchInterval);
    }
  }, [activities, initialFetch]);

  return (
    <div className={styles.board}>
      {error && <p>Error: {error}</p>}
      {['camp', 'competition', 'other'].map((category) => (
        <div key={category}>
          <Category
            title={category.charAt(0).toUpperCase() + category.slice(1)}
            activities={activities[category] || []}
            currentIndex={currentIndices[category]}
          />
        </div>
      ))}
    </div>
  );
};

export default Board;
