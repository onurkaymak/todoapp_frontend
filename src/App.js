import { Routes, Route, Navigate } from 'react-router';

import { useSelector } from 'react-redux';

import './App.css';

import Auth from './components/pages/Auth';
import AddNewTodo from './components/pages/AddNewTodo';
import Layout from './components/layout/Layout';


function App() {

  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

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
