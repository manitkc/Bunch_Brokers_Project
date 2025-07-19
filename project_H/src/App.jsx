import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './Login/Login.jsx';
import HomePage from "./HomePage/HomePage.jsx";
import Registration from "./Registration/Registration.jsx";


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/Registration" element={<Registration />} />
      </Routes>
    </div>

  )
}

export default App
