import React from 'react';
import './App.css';
import Head from './Head';


function App() {

  const API_KEY = process.env.REACT_APP_OPENWEATHER_API;
  
  return (
    <div>
      {Head(API_KEY)}
    </div>
  )
}

export default App;
