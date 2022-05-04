import React, { useEffect, useState } from 'react';
import ApartComponent from './components/ApartComponent/ApartComponent';
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
    <div className='App'>
      <h1>Aparts List</h1>
      {
        loading ? (
          <h2>Loading...</h2>
        ) : (
          apartments.map(apart => (
            <ApartComponent
              key={apart.id}
              id={apart.id}
              area_total={apart.area_total}
              floor={apart.floor}
              rooms={apart.rooms}
              price={apart.price}
            />
          ))
        )
      }
    </div>
  );
}

export default App;
