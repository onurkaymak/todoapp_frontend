import classes from './Notification.module.scss';

import { uiActions } from '../store/ui-slice';

import { useDispatch } from 'react-redux';

import { Fragment } from 'react';


const Notification = (props) => {

  const dispatch = useDispatch();

  let specialClasses = '';

  if (props.status === 'error') {
    specialClasses = classes.error;
  }
  if (props.status === 'success') {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  const clickHandler = () => {
    dispatch(uiActions.setNotification())
  }

  return (
    <div className={classes.notification__container}>
      <div className={classes.notification__bg}></div>
      <section className={cssClasses}>
        <h2 className={classes.title}>{props.title}</h2>
        <p className={classes.message}>{props.message}</p>
        <button className={classes.button} onClick={clickHandler}>Okay</button>
      </section>
    </div>

  );
};

export default Notification;