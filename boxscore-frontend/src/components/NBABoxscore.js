import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NBABoxScore() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/nba');
      setData(response.data);
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="boxscore">
      <h2>NBA Box Score</h2>
      <div className="teams">
        <div className="team">
          <h3>{data.away_team.full_name}</h3>
          <p>Points: {data.away_totals.points}</p>
          <p>Assists: {data.away_totals.assists}</p>
          {/* Add more relevant data */}
        </div>
        <div className="team">
          <h3>{data.home_team.full_name}</h3>
          <p>Points: {data.home_totals.points}</p>
          <p>Assists: {data.home_totals.assists}</p>
          {/* Add more relevant data */}
        </div>
      </div>
    </div>
  );
}

export default NBABoxScore;
