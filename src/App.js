import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const data = await fetch('http://localhost:3001/getAparts');
    const response = await data.json();
    setApartments(response);
  }

  useEffect(() => {
    setLoading(true);
    try {
      fetchData();
      setLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  }, [])

  return (
    <div>
      <h1>Works!</h1>
      {
        loading ? (
          <h2>Loading...</h2>
        ) : (
          apartments.map(apart => (
            <div key={apart.id}>{apart.floor}</div>
          ))
        )
      }
    </div>
  );
}

export default App;
