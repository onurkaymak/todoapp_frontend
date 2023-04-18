import React from 'react';

import classes from './Card.module.scss';


const Card = (props) => {
  return (
    <div className={classes.card}>
      <div>
        <h1>{props.children}</h1>
      </div>
    </div>
  );
};

export default Card;


