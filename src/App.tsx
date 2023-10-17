import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserAuthContextProvider } from './context/UserAuthContext';
import Home from './pages/home/home';
// import Home from './pages/home/home';
// import Home from './pages/home/home';
import Login from './components/sidebar/auth/login';
import SignUp from './components/sidebar/auth/signup';
import Layout from './layout';
import Expenses from './pages/expense/expense';

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <Layout>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<SignUp/>}/>
          <Route path='/expense' element={<Expenses/>}/>

        </Routes>
        </Layout>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
