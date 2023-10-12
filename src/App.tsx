import React from 'react';
// import { Route, Routes } from 'react-router-dom';
import { UserAuthContextProvider } from './context/UserAuthContext';
import Home from './pages/home/home';
import Sidebar from './components/sidebar/sidebar';

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
            <Sidebar/>
          <Home/>
        {/* <Routes> */}
          {/* <Route path='/' element={<Home/>}/> */}
        {/* </Routes> */}
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
