import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';

import { useSelector, useDispatch } from 'react-redux';

import { useEffect, useCallback } from 'react';

import { userActions } from '../../store/user-slice';

import { logout } from '../../store/auth-actions';



export let logoutTimer;


export const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();

  const adjExpirationTime = new Date(expirationTime).getTime();


  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration
}


const MainNavigation = () => {

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.user.isLoggedIn);



  const logoutHandler = useCallback(() => {
    dispatch(logout())
    clearTimeout(logoutTimer);
  }, [dispatch]);



  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));

    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {

      const userId = storedData.userId;
      const token = storedData.token;
      const expirationTime = storedData.expiration;

      dispatch(userActions.login({ userId, token, expirationTime }));
      dispatch(userActions.setIsLoggedIn(true));
      const remainingTime = calculateRemainingTime(expirationTime)
      console.log(remainingTime)
      logoutTimer = setTimeout(logout, remainingTime);
    }
    else {
      logoutHandler()
    }
  }, [dispatch, logoutHandler]);



  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Todo App</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;





