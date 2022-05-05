import React, { useEffect, useState } from 'react';
import MySelect from '../../components/UI/MySelect/MySelect';
import ApartsList from '../../components/ApartsList/ApartsList';
import MyButton from '../../components/UI/MyButton/MyButton';
import { useSortedAparts } from '../../hooks/useSortedAparts';
import { useFetching } from '../../hooks/useFetching';
import { fetchApartaments } from '../../API/API';

import classes from './ApartsListPage.module.css';

const ApartsListPage = () => {
  const [apartments, setApartments] = useState([]);
  const [selectedSort, setSelectedSort] = useState({sortType: '', from: ''});
  const [additionalSortTypes, setAdditionalSortTypes] = useState(false);

  const [fetchAparts, isLoading, error] = useFetching(async () => {
    const apartamentsRes = await fetchApartaments();
    setApartments(apartamentsRes);
  });

  const sortTypes = [
    {name: 'By Floor', value: 'floor'},
    {name: 'By Price', value: 'price'},
    {name: 'By Rooms', value: 'rooms'},
    {name: 'By Total Area', value: 'area_total'},
  ]
  
  const additionalTypes = [
    {name: 'By ID', value: 'id'},
    {name: 'By Kitchen Area', value: 'area_kitchen'},
    {name: 'By Live Area', value: 'area_live'},
  ]

  const fromToTypes = [
    {name: 'From Min To Max', value: 'min'},
    {name: 'From Max To Min', value: 'max'}
  ]

  const sortedAparts = useSortedAparts(apartments, selectedSort);

  useEffect(() => {
    fetchAparts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h1 className={classes.heading}>Aparts List</h1>
      <div className={classes.sortSection}>
        <MySelect
          value={selectedSort.sortType}
          onSelectChange={value => setSelectedSort({...selectedSort, sortType: value})}
          options={sortTypes}
          defaultValue={{name: 'Sort By', value: ''}}
        />
        {additionalSortTypes ? (
          <MySelect
            value={selectedSort.sortType}
            onSelectChange={value => setSelectedSort({...selectedSort, sortType: value})}
            options={additionalTypes}
            defaultValue={{name: 'Sort By', value: ''}}
          />
        ) : <></>}
        <MySelect
          value={selectedSort.from}
          onSelectChange={value => setSelectedSort({...selectedSort, from: value})}
          options={fromToTypes}
          defaultValue={{name: 'From To', value: ''}}
        />
        <MyButton onClickChanger={() => setAdditionalSortTypes(!additionalSortTypes)}>
          {additionalSortTypes ? 'Close Additional Sort Types' : 'More Sort Types'}
        </MyButton>
      </div>
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