import React, {useState, useEffect} from 'react';
import MyButton from '../../components/UI/MyButton/MyButton';
import MySelect from '../../components/UI/MySelect/MySelect';

import classes from './ApartsSort.module.css';

const ApartsSort = ({content, selectedSort, setSelectedSort}) => {
  const [additionalSortTypes, setAdditionalSortTypes] = useState(false);

  useEffect(() => {
    const selectedSortLC = JSON.parse(localStorage.getItem('selectedSort'));
    const additionalSortTypesLC = JSON.parse(localStorage.getItem('additionalSortTypes'));

    if (selectedSortLC) {
      setSelectedSort(selectedSortLC);
    }
    if(additionalSortTypesLC) {
      setAdditionalSortTypes(additionalSortTypesLC)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    localStorage.setItem('additionalSortTypes', JSON.stringify(additionalSortTypes));
    localStorage.setItem('selectedSort', JSON.stringify(selectedSort));
  }, [selectedSort, additionalSortTypes])

  return (
    <div className={classes.sortSection}>
    <MySelect
      value={selectedSort.sortType}
      onSelectChange={value => setSelectedSort({...selectedSort, sortType: value})}
      options={content.sortTypes}
      defaultValue={{name: 'Sort By', value: ''}}
    />
    {additionalSortTypes ? (
      <MySelect
        value={selectedSort.sortType}
        onSelectChange={value => setSelectedSort({...selectedSort, sortType: value})}
        options={content.additionalTypes}
        defaultValue={{name: 'Sort By', value: ''}}
      />
    ) : <></>}
    <MySelect
      value={selectedSort.from}
      onSelectChange={value => setSelectedSort({...selectedSort, from: value})}
      options={content.fromToTypes}
      defaultValue={{name: 'From To', value: ''}}
    />
    <MyButton onClickChanger={() => setAdditionalSortTypes(!additionalSortTypes)}>
      {additionalSortTypes ? 'Close Additional Sort Types' : 'More Sort Types'}
    </MyButton>
  </div>
  );
};

export default ApartsSort;