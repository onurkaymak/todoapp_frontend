import { userActions } from "./user-slice";

import { logoutTimer } from "../components/layout/MainNavigation";

import axios from 'axios';

import { todoActions } from "./todo-slice";

import { uiActions } from "./ui-slice";



export const logout = () => {
  return async (dispatch) => {
    dispatch(userActions.logout())
    dispatch(userActions.setIsLoggedIn(false));
    dispatch(todoActions.resetTodos());
    localStorage.removeItem('userData');

    if (logoutTimer) {
      clearTimeout(logoutTimer)
    }
  }
}



export const createUser = (userInfo) => {
  return async (dispatch) => {

    const { enteredName, enteredEmail, enteredPassword } = userInfo;
    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL + 'api/users/login/users/signup',
        {
          "name": enteredName,
          "email": enteredEmail,
          "password": enteredPassword
        },);

      const userId = response.data.userId;
      const token = response.data.token;
      const expirationTimeISO = new Date(new Date().getTime() + 1000 * 60 * 60).toISOString();

      localStorage.setItem('userData', JSON.stringify({
        userId,
        token,
        expiration: expirationTimeISO
      }))
      dispatch(userActions.login({ userId, token, expirationTimeISO }));
      dispatch(userActions.setIsLoggedIn(true));
    }
    catch (err) {
      dispatch(uiActions.showNotification({ title: err.message, message: err.response.data.message, status: 'error' }))
    }
  }
}

export const signInUser = (userInfo) => {
  return async (dispatch) => {

    const { enteredEmail, enteredPassword } = userInfo;
    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL + 'api/users/login',
        {
          "email": enteredEmail,
          "password": enteredPassword
        });

      const userId = response.data.userId;
      const token = response.data.token;
      const expirationTimeISO = new Date(new Date().getTime() + 1000 * 60 * 60).toISOString();

      localStorage.setItem('userData', JSON.stringify({
        userId,
        token,
        expiration: expirationTimeISO
      }))
      dispatch(userActions.login({ userId, token, expirationTimeISO }));
      dispatch(userActions.setIsLoggedIn(true));
    }
    catch (err) {
      dispatch(uiActions.showNotification({ title: err.message, message: err.response.data.message, status: 'error' }))
    }

  }
}

