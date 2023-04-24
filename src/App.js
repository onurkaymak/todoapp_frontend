import { Routes, Route, Navigate } from 'react-router';

// import { userActions } from "./store/user-slice";

// import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import Notification from './UI/Notification';

import classes from './App.module.scss';

// import { calculateRemainingTime } from './store/auth-actions';

import Auth from './components/pages/Auth';
import AddNewTodo from './components/pages/AddNewTodo';
import Layout from './components/layout/Layout';



function App() {

  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  const ui = useSelector(state => state.ui.notification);

  return (
    <div className={classes.container}>
      {ui && <Notification title={ui.title} message={ui.message} status={ui.status} />}
      <Layout>
        <Routes>
          {isLoggedIn && (<Route path='/' element={<Navigate to={'/profile'} />} />)}
          {!isLoggedIn && (<Route path='/' element={<Navigate to={'/auth'} />} />)}
          {!isLoggedIn && (<Route path='/auth' element={<Auth />} />)}
          {!isLoggedIn && (<Route path='/profile' element={<Auth />} />)}
          {isLoggedIn && (<Route path='/profile' element={<AddNewTodo />} />)}
          <Route path='*' element={<Navigate to={'/'} />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
