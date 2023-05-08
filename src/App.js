import { Routes, Route, Navigate } from 'react-router';

import { useSelector } from 'react-redux';

import Notification from './UI/Notification';

import classes from './App.module.scss';

import Auth from './components/pages/Auth';

import Layout from './components/layout/Layout';

import { Suspense, lazy } from 'react';
import LoadingSpinner from './UI/LoadingSpinner';

const AddNewTodo = lazy(() => import('./components/pages/AddNewTodo'))




function App() {

  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  const ui = useSelector(state => state.ui.notification);

  return (
    <div className={classes.container}>
      {ui && <Notification title={ui.title} message={ui.message} />}
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {isLoggedIn && (<Route path='/' element={<Navigate to={'/profile'} />} />)}
            {!isLoggedIn && (<Route path='/' element={<Navigate to={'/auth'} />} />)}
            {!isLoggedIn && (<Route path='/auth' element={<Auth />} />)}
            {!isLoggedIn && (<Route path='/profile' element={<Auth />} />)}
            {isLoggedIn && (<Route status path='/profile' element={<AddNewTodo />} />)}
            <Route path='*' element={<Navigate to={'/'} />} />
          </Routes>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
