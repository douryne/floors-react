import React from 'react';
import classes from './MySelect.module.css';

const MySelect = ({value, onSelectChange, options, defaultValue}) => {
  return (
    <select
      value={value}
      onChange={e => onSelectChange(e.target.value)}
      className={classes.select}
    >
      <option value={defaultValue.value} disabled>{defaultValue.name}</option>
      {
        options.map(option => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))
      }
    </select>
  );
};

export default MySelect;