import { Routes, Route, Navigate } from 'react-router';

// import { userActions } from "./store/user-slice";

// import { useEffect } from 'react';

import { useSelector } from 'react-redux';

import './App.css';

// import { calculateRemainingTime } from './store/auth-actions';

import Auth from './components/pages/Auth';
import AddNewTodo from './components/pages/AddNewTodo';
import Layout from './components/layout/Layout';



function App() {

  // const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.user.isLoggedIn);



  // console.log(isLoggedIn)

  // const userid = useSelector(state => state.user.userId)
  // const usertoken = useSelector(state => state.user.token)
  // const tokenexpirationTime = useSelector(state => state.user.expirationTime)



  return (
    <div>
      <Layout>
        <Routes>
          <Route path='/' element={<p>WELCOME to TODO APP</p>} />
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
