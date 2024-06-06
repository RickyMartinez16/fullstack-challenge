import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NBABoxScore from './components/NBABoxscore';
import MLBBoxScore from './components/MLBBoxscore';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/nba" element={<NBABoxScore />} />
          <Route exact path="/mlb" element={<MLBBoxScore />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
