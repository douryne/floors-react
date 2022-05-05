import React from 'react';

import classes from './MyButton.module.css';

const MyButton = ({children, onClickChanger}) => {
  return (
    <button
      onClick={() => onClickChanger()}
      className={classes.btn}
    >
      {children}
    </button>
  );
};

export default MyButton;