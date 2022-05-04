import React from 'react';
import classes from './ApartComponent.module.css';

const ApartComponent = ({id, area_total, floor, rooms, price}) => {
  return (
    <div className={classes.apart}>
      <h2 className={classes.heading}>
        Квартира: <span className={classes.id}>{id}</span>
      </h2>
      <ul className={classes.list}>
        <li>Total Area: {area_total}</li>
        <li>Floor: {floor} </li>
        <li>Rooms: {rooms}</li>
      </ul>
      <span className={classes.price}>Price: {price}</span>
    </div>
  );
};

export default ApartComponent;