import { useState, useRef, Fragment } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import classes from './AuthForm.module.css';

import { createUser, signInUser } from '../../store/auth-actions';

import Notification from '../../UI/Notification';

import { useNavigate } from 'react-router';

import axios from 'axios';


const AuthForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isValidated, setIsValidated] = useState(null)

  const notification = useSelector(state => state.ui.notification);


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };



  const submitHandler = (event) => {
    event.preventDefault();


    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (enteredEmail.trim() === '' || !enteredEmail.includes('@')) {
      setIsValidated(false)
      return
    }

    if (enteredPassword.trim() === '' || enteredPassword.length < 6) {
      setIsValidated(false)
      return
    }

    setIsValidated(true);

    if (isLogin) {
      const userInfo = {
        enteredEmail,
        enteredPassword
      }

      const sendLoginUser = async (userInfo) => {
        const { enteredEmail, enteredPassword } = userInfo;
        try {
          const response = await axios.post('http://localhost:4000/api/users/login',
            {
              "email": enteredEmail,
              "password": enteredPassword
            });
          console.log(response.data);
        }
        catch (error) {
          console.log(error.response.data.message);
        }
      }
      sendLoginUser(userInfo);
      dispatch(signInUser(userInfo));
      navigate('/profile', { replace: true });


    } else {
      // dispatch(createUser(userInfo))
      // navigate('/profile', { replace: true })\
      const enteredName = nameInputRef.current.value;

      if (enteredName.trim() === '') {
        setIsValidated(false)
        return
      }

      setIsValidated(true);


      const userInfo = {
        enteredName,
        enteredEmail,
        enteredPassword
      }

      // const sendCreateUser = async (userInfo) => {
      //   const { enteredName, enteredEmail, enteredPassword } = userInfo;
      //   try {
      //     const response = await axios.post('http://localhost:4000/api/users/signup',
      //       {
      //         "name": enteredName,
      //         "email": enteredEmail,
      //         "password": enteredPassword
      //       });
      //     console.log(response.data);
      //   }
      //   catch (err) {
      //     console.log(err);
      //   }
      // }
      // sendCreateUser(userInfo);
      try {
        dispatch(createUser(userInfo))
      } catch (error) {
        return console.log(error);
      }
      navigate('/profile', { replace: true })

    }
    event.target.reset()
  }




  return (
    <Fragment>
      {notification && (<Notification status={notification.status} title={notification.title} message={notification.message} />)}
      <section className={classes.auth}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={submitHandler} noValidate>
          {!isLogin && <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' ref={nameInputRef} />
            {isValidated === false && <p className={classes.errorText}>Please enter a valid name, email and password.</p>}
          </div>}
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' ref={emailInputRef} />
            {isValidated === false && isLogin && <p className={classes.errorText}>Please enter a valid email and password.</p>}
            {isValidated === false && !isLogin && <p className={classes.errorText}>Please enter a valid name, email and password.</p>}
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Your Password</label>
            <input type='password' id='password' ref={passwordInputRef} />
            {isValidated === false && isLogin && <p className={classes.errorText}>Please enter a valid email and password.</p>}
            {isValidated === false && !isLogin && <p className={classes.errorText}>Please enter a valid name, email and password.</p>}
          </div>
          <div className={classes.actions}>
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
            <button
              type='button'
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

export default AuthForm;