import React, { useEffect, useState } from 'react';
import ApartComponent from './components/ApartComponent/ApartComponent';
import MySelect from './components/UI/MySelect/MySelect';
import { useSortedAparts } from './hooks/useSortedAparts';
import './App.css';

function App() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSort, setSelectedSort] = useState('');

  const options = [
    {name: 'By Floor', value: 'floor'},
    {name: 'By Price', value: 'price'}
  ]

  const sortedAparts = useSortedAparts(apartments, selectedSort);

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
      <MySelect
        value={selectedSort}
        onSelectChange={value => setSelectedSort(value)}
        options={options}
        defaultValue='Sort by'
      />
      {
        loading ? (
          <h2>Loading...</h2>
        ) : (
          sortedAparts.map(apart => (
            <ApartComponent
              key={apart.id}
              id={apart.id}
              area_total={apart.area_total}
              floor={apart.floor}
              rooms={apart.rooms}
              price={apart.price}
              img={apart.layout_image}
            />
          ))
        )
      }
    </div>
  );
}

export default App;
