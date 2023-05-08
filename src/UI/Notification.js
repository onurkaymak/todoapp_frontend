import classes from './Notification.module.scss';

import { uiActions } from '../store/ui-slice';

import { useDispatch } from 'react-redux';




const Notification = (props) => {

  const dispatch = useDispatch();


  const clickHandler = () => {
    dispatch(uiActions.setNotification())
  }

  return (
    <div className={classes.notification__container}>
      <div className={classes.notification__bg}></div>
      <section className={classes.notification}>
        <h2 className={classes.title}>{props.title}</h2>
        <p className={classes.message}>{props.message}</p>
        <button className={classes.button} onClick={clickHandler}>Okay</button>
      </section>
    </div>

  );
};

export default Notification;