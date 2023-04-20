import React from 'react';

import classes from './Card.module.scss';


const Card = (props) => {
  return (
    <div className={classes.card}>
      {props.children}
      {/* <h1 className={classes.card__container}>{props.children}</h1> */}
    </div>
  );
};

export default Card;


