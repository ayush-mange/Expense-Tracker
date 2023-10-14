import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserAuthContextProvider } from './context/UserAuthContext';
import Home from './pages/home/home';
import Login from './components/sidebar/auth/login';
import SignUp from './components/sidebar/auth/signup';
import Layout from './layout';

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <Layout>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<SignUp/>}/>
        </Routes>
        </Layout>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
