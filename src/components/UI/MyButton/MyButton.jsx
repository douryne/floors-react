import React from 'react';

import classes from './MyButton.module.css';

const MyButton = ({children, onClickChanger, disabled}) => {
  return (
    <button
      onClick={() => onClickChanger()}
      className={classes.btn}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default MyButton;