import React, { useEffect, useState } from 'react';
import ApartsList from '../../components/ApartsList/ApartsList';
import ApartsSort from '../../components/ApartsSort/ApartsSort';
import { useFetching } from '../../hooks/useFetching';
import { fetchApartaments } from '../../API/API';

import classes from './ApartsListPage.module.css';
import { usePaginatedAndSorted } from '../../hooks/usePaginatedAndSorted';
import MyButton from '../../components/UI/MyButton/MyButton';
import { useLocalStorage } from '../../hooks/useLocalStorage';

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

  const paginatedAndSortedAparts = usePaginatedAndSorted(apartments, selectedSort, page, apartsToShow);

  useLocalStorage('page', setPage);
  
  useEffect(() => {
    localStorage.setItem('page', JSON.stringify(page));
  }, [page])
  
  useEffect(() => {
    fetchAparts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        setSelectedSort={(value) => {
          setSelectedSort(value);
          setPage(1);
        }}
      />
      <div className={classes.pagination}>
        <span className={`${classes.heading} ${classes.heading_page}`}>
          Page:  <span className={classes.id}>{page}</span>
        </span>
        <MyButton disabled={page === 1} onClickChanger={() => setPage(page-1)}>Prev</MyButton>
        <MyButton disabled={page === totalPage} onClickChanger={() => setPage(page+1)}>Next</MyButton>
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