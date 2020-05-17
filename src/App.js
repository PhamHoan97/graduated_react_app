import React from 'react';
import './App.css';
import ListUrl from './Routes/ListUrl';
import AlertMessage from './Alert/AlertMessage';

function App() {
    return (
      <>
        <ListUrl></ListUrl>
        <AlertMessage />
      </>
    );
}

export default App;
