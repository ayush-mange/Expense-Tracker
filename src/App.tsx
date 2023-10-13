import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserAuthContextProvider } from './context/UserAuthContext';
import Home from './pages/home/home';
import Sidebar from './components/sidebar/sidebar';
import Login from './components/sidebar/auth/login';
import SignUp from './components/sidebar/auth/signup';

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
            {/* <Sidebar/> */}
          {/* <Home/> */}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<SignUp/>}/>

          
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
