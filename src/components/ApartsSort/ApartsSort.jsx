import React, { useState } from 'react';
import MyButton from '../../components/UI/MyButton/MyButton';
import MySelect from '../../components/UI/MySelect/MySelect';

import classes from './ApartsSort.module.css';

const ApartsSort = ({selectedSort, setSelectedSort}) => {
  const [additionalSortTypes, setAdditionalSortTypes] = useState(false);
  

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

  return (
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
  );
};

export default ApartsSort;