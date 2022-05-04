import React from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './ApartComponent.module.css';

const ApartComponent = ({id, area_total, floor, rooms, price, img}) => {
  const navigate = useNavigate();

  return (
    <div className={classes.apart} onClick={() => navigate(`/${id}`)}>
      <div className={classes.textContent}>
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
      <img className={classes.img} src={img} alt="" />
    </div>
  );
};

export default ApartComponent;