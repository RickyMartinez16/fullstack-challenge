import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MLBBoxScore() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/mlb');
      setData(response.data);
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="boxscore">
      <h2>MLB Box Score</h2>
      <div className="teams">
        <div className="team">
          <h3>{data.awayTeam}</h3>
          <p>Runs: {data.awayRuns}</p>
          <p>Hits: {data.awayHits}</p>
          {/* Add more data as needed */}
        </div>
        <div className="team">
          <h3>{data.homeTeam}</h3>
          <p>Runs: {data.homeRuns}</p>
          <p>Hits: {data.homeHits}</p>
          {/* Add more data as needed */}
        </div>
      </div>
    </div>
  );
}

export default MLBBoxScore;
