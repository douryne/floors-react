import React from 'react';
import ApartComponent from '../../components/ApartComponent/ApartComponent';

import classes from './ApartsList.module.css';

const ApartsList = ({sortedAparts}) => {
  return (
    <div className={classes.list}>
      {
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
      }
    </div>
  );
};

export default ApartsList;