const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const app = express();

mongoose.connect('mongodb://localhost:27017/boxscore', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB', error);
});

const gameSchema = new mongoose.Schema({
  sport: String,
  data: Object,
  lastUpdated: Date
});

const Game = mongoose.model('Game', gameSchema);

async function fetchData(url, sport) {
  const now = new Date();
  const game = await Game.findOne({ sport });

  if (game && (now - game.lastUpdated) < 15000) {
    return game.data;
  } else {
    const response = await axios.get(url);
    const data = response.data;

    if (game) {
      game.data = data;
      game.lastUpdated = now;
      await game.save();
    } else {
      await Game.create({ sport, data, lastUpdated: now });
    }

    return data;
  }
}

app.get('/', (req, res) => {
    res.send('Welcome to the Boxscore');
  });
  

app.get('/nba', async (req, res) => {
  const data = await fetchData('https://chumley.barstoolsports.com/dev/data/games/6c974274-4bfc-4af8-a9c4-8b926637ba74.json', 'nba');
  res.json(data);
});

app.get('/mlb', async (req, res) => {
  const data = await fetchData('https://chumley.barstoolsports.com/dev/data/games/eed38457-db28-4658-ae4f-4d4d38e9e212.json', 'mlb');
  res.json(data);
});


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
