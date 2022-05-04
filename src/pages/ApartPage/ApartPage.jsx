import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../../hooks/useFetching';

import classes from './ApartPage.module.css';

const ApartPage = () => {
  const {id} = useParams();
  const [apartData, setApartData] = useState({});

  const [fetchApart, isLoading, error] = useFetching(async () => {
    const data = await fetch(`http://localhost:3001/getApartById?id=${id}`);
    const response = await data.json();
    setApartData(response);
  });

  useEffect(() => {
    fetchApart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.apart}>

      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        error ? (
          <h1>{error}</h1>
        ) : (
          <>
            <img className={classes.img} src={apartData.layout_image} alt="" />
            <div className={classes.textContent}>
              <h1 className={classes.heading}>
                Квартира: <span className={classes.data}>{id}</span>
              </h1>
              <ul className={classes.list}>
                <li>
                  Total Area: <span className={classes.data}>{apartData.area_total}</span>
                </li>
                <li>
                  Kitchen Area: <span className={classes.data}>{apartData.area_kitchen}</span>
                </li>
                <li>
                  Live Area: <span className={classes.data}>{apartData.area_live}</span>
                </li>
                <li>
                  Rooms: <span className={classes.data}>{apartData.rooms}</span>
                </li>
                <li>
                  Floor: <span className={classes.data}>{apartData.floor}</span>
                </li>
                <li>
                  Position on floor: <span className={classes.data}>{apartData.pos_on_floor}</span>
                </li>
              </ul>
              <span className={classes.price}>
                Price: <span className={classes.data}>{apartData.price}</span>
              </span>
            </div>
          </>
        )
      )}
    </div>

      
  );
};

export default ApartPage;