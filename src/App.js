import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import ListUrl from './Routes/ListUrl';
import System from './System/System';


function App() {
  // set biến  localStorage để điều hướng route
  var idUser = '0';
  // var idUser = '1'
  if(idUser === '1'){
    return (
      <Router>
          <div className="App">
            <ListUrl></ListUrl>
          </div>
      </Router>
    );
  }else{
    return (
      <System/>
    );
  }
}

export default App;
