import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';

import { useSelector, useDispatch } from 'react-redux';

import { useEffect, useCallback } from 'react';

import { userActions } from '../../store/user-slice';

// import { calculateRemainingTime } from '../../store/auth-actions';

import { logoutHandlerr } from '../../store/auth-actions';



export let logoutTimer;

// export const setLogoutTimer = (value) => {
//   logoutTimer = value;
// }

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
    dispatch(logoutHandlerr())
  }, [dispatch]);


  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));

    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {

      const userId = storedData.userId;
      const token = storedData.token;
      const expirationTime = storedData.expiration;

      const remainingTime = calculateRemainingTime(expirationTime);


      if (remainingTime <= 60000) {
        logoutHandler()
        // return null
      }
      else {
        dispatch(userActions.login({ userId, token, expirationTime }));
        dispatch(userActions.setIsLoggedIn(true));
        logoutTimer = setTimeout(logoutHandler, remainingTime);
      }
    }
  }, [dispatch, logoutHandler]);






  // useEffect(() => {
  //   const tokenData = retrieveStoredToken();

  //   let initialToken;
  //   let initialTime;

  //   if (tokenData) {
  //     initialToken = tokenData.token;
  //     initialTime = tokenData.remainingTime;

  //     logoutTimer = setTimeout(logoutHandler, initialTime);
  //     dispatch(userActions.login({ token: initialToken, remainingTime: initialTime }));
  //   }

  //   if (token) {
  //     dispatch(userActions.setIsLoggedIn(true));
  //   }
  // }, [dispatch, token, logoutHandler])





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






// const retrieveStoredToken = () => {

//   const storedToken = localStorage.getItem('token');
//   const storedExpirationDate = localStorage.getItem('expirationTime');

//   const remainingTime = calculateRemainingTime(storedExpirationDate);

//   if (remainingTime <= 60000) {
//     localStorage.removeItem('token');
//     localStorage.removeItem('expirationTime');
//     return null
//   }

//   return { token: storedToken, remainingTime };
// }