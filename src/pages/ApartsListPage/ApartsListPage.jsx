import React, { useEffect, useState } from 'react';
import ApartsList from '../../components/ApartsList/ApartsList';
import ApartsSort from '../../components/ApartsSort/ApartsSort';
import { useSortedAparts } from '../../hooks/useSortedAparts';
import { useFetching } from '../../hooks/useFetching';
import { fetchApartaments } from '../../API/API';

import classes from './ApartsListPage.module.css';

const ApartsListPage = () => {
  const [apartments, setApartments] = useState([]);
  const [selectedSort, setSelectedSort] = useState({sortType: '', from: ''});

  const [fetchAparts, isLoading, error] = useFetching(async () => {
    const apartamentsRes = await fetchApartaments();
    setApartments(apartamentsRes);
  });

  const sortedAparts = useSortedAparts(apartments, selectedSort);

  useEffect(() => {
    fetchAparts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h1 className={classes.heading}>Aparts List</h1>
      <ApartsSort selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
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