import React, { useEffect, useState } from 'react';
import MySelect from '../../components/UI/MySelect/MySelect';
import { useSortedAparts } from '../../hooks/useSortedAparts';
import { useFetching } from '../../hooks/useFetching';
import ApartsList from '../../components/ApartsList/ApartsList';

import classes from './ApartsListPage.module.css';

const ApartsListPage = () => {
  const [apartments, setApartments] = useState([]);
  const [selectedSort, setSelectedSort] = useState('');

  const [fetchAparts, isLoading, error] = useFetching(async () => {
    const data = await fetch('http://localhost:3001/getAparts');
    const response = await data.json();
    setApartments(response);
  });

  const options = [
    {name: 'By ID', value: 'id'},
    {name: 'By Floor', value: 'floor'},
    {name: 'By Price', value: 'price'},
    {name: 'By Rooms', value: 'rooms'},
    {name: 'By Total Area', value: 'area_total'},
    {name: 'By Kitchen Area', value: 'area_kitchen'},
    {name: 'By Live Area', value: 'area_live'},
  ]

  const sortedAparts = useSortedAparts(apartments, selectedSort);

  useEffect(() => {
    fetchAparts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h1 className={classes.heading}>Aparts List</h1>
      <MySelect
        value={selectedSort}
        onSelectChange={value => setSelectedSort(value)}
        options={options}
        defaultValue='Sort by'
      />
      {
        isLoading ? (
          <h2>Loading...</h2>
        ) : (
          error ? (
            <h2>{error}</h2>
          ) : (
            <ApartsList sortedAparts={sortedAparts} />
          )
        )
      }
    </div>
  );
};

export default ApartsListPage;