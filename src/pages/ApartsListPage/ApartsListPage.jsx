import React, { useEffect, useMemo, useState } from 'react';
import ApartsList from '../../components/ApartsList/ApartsList';
import ApartsSort from '../../components/ApartsSort/ApartsSort';
import { useSortedAparts } from '../../hooks/useSortedAparts';
import { useFetching } from '../../hooks/useFetching';
import { fetchApartaments } from '../../API/API';

import classes from './ApartsListPage.module.css';

const ApartsListPage = () => {
  const [apartments, setApartments] = useState([]);
  const [selectedSort, setSelectedSort] = useState({sortType: '', from: ''});
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const apartsToShow = 4;

  const [fetchAparts, isLoading, error] = useFetching(async () => {
    const apartamentsRes = await fetchApartaments();
    setApartments(apartamentsRes);
    setTotalPage(Math.ceil(apartamentsRes.length/apartsToShow));
  });
  
  useEffect(() => {
    fetchAparts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useMemo(() => {
    setPage(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSort])

  const sortedAparts = useSortedAparts(apartments, selectedSort);

  const paginatedAndSortedAparts = useMemo(() => {
    if (!sortedAparts) return [];
    return [...sortedAparts].slice((page-1)*apartsToShow, page*apartsToShow);
  }, [page, sortedAparts]);


  const sortContent = {
    sortTypes: [
      {name: 'By Floor', value: 'floor'},
      {name: 'By Price', value: 'price'},
      {name: 'By Rooms', value: 'rooms'},
      {name: 'By Total Area', value: 'area_total'},
    ],
    additionalTypes: [
      {name: 'By ID', value: 'id'},
      {name: 'By Kitchen Area', value: 'area_kitchen'},
      {name: 'By Live Area', value: 'area_live'},
    ],
    fromToTypes: [
      {name: 'From Min To Max', value: 'min'},
      {name: 'From Max To Min', value: 'max'}
    ]
  }

  return (
    <div>
      <h1 className={classes.heading}>Aparts List</h1>
      <ApartsSort
        content={sortContent}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />
      <div style={{marginBottom: '20px', display: 'flex', gap: '20px'}}>
        <span className={classes.heading}>{page}</span>
        <button disabled={page === 1} onClick={() => setPage(page-1)}>Prev</button>
        <button disabled={page === totalPage} onClick={() => setPage(page+1)}>Next</button>
      </div>
      {
        isLoading ? (
          <h2>Loading...</h2>
        ) : (
          error ? (
            <h2>{error}</h2>
          ) : (
            <ApartsList sortedAparts={paginatedAndSortedAparts} />
          )
        )
      }
    </div>
  );
};

export default ApartsListPage;