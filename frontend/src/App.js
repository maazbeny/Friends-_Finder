import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Login from './Pages/Login';
import Navbar from './Components/Navbar/Navbar';
import DashBoard from './Pages/DashBoard';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<DashBoard />}>
            <Route path=':id' element={<DashBoard />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
