import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/techoi/raw-data-api/main/simple-api.json'
    )
      .then((res) => res.json())
      .then((result) => console.log(result));
  }, []);
  return <div className='App'>This is react project kim ki tae</div>;
}

export default App;
