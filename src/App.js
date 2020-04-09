import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import ListUrl from './Routes/ListUrl';
// import Intro from './Intro/Component/Intro';

function App() {
  return (
    <Router>
        <div className="App">
          <ListUrl></ListUrl>
        </div>
    </Router>
    // <Intro />
  );
}

export default App;
