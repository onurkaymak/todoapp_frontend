import { useState, useRef, Fragment } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import classes from './AuthForm.module.scss';

import { createUser, signInUser } from '../../store/auth-actions';

import { useNavigate } from 'react-router';
import LoadingSpinner from '../../UI/LoadingSpinner';



const AuthForm = () => {

  const isLoading = useSelector(state => state.ui.isLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isValidated, setIsValidated] = useState(true)


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
      dispatch(signInUser(userInfo));
      navigate('/profile', { replace: true });

    } else {

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


      dispatch(createUser(userInfo))

      navigate('/profile', { replace: true })

    }
    event.target.reset()
  }

  const focusHandler = () => {
    setIsValidated(true)
  }

  let buttonContent;

  if (isLoading) {
    buttonContent = <LoadingSpinner />
  }
  else if (!isLoading && isLogin) {
    buttonContent = 'Login';
  }
  else {
    buttonContent = 'Create Account';
  }


  return (
    <Fragment>
      <section className={classes.auth}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={submitHandler} noValidate>
          {!isLogin && <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' ref={nameInputRef} onChange={focusHandler} />
            {!isValidated && <p className={classes.errorText}>Please enter a valid name, email and password.</p>}
          </div>}
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' ref={emailInputRef} onChange={focusHandler} />
            {!isValidated && isLogin && <p className={classes.errorText}>Please enter a valid email and password.</p>}
            {!isValidated && !isLogin && <p className={classes.errorText}>Please enter a valid name, email and password.</p>}
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Your Password</label>
            <input type='password' id='password' ref={passwordInputRef} onChange={focusHandler} />
            {!isValidated && isLogin && <p className={classes.errorText}>Please enter a valid email and password.</p>}
            {!isValidated && !isLogin && <p className={classes.errorText}>Please enter a valid name, email and password.</p>}
          </div>
          <div className={classes.actions}>
            <button>
              {buttonContent}
              {/* {loading && <LoadingSpinner />}
              {isLogin ? 'Login' : 'Create Account'} */}
            </button>
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