import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './Login/Login.jsx';
import HomePage from "./HomePage/HomePage.jsx";
import JobPage from "./JobPage/JobPage.jsx";
import Friends from './Friends/Friends.jsx';
import ProfilePage from './ProfilePage/ProfilePage.jsx';
function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/JobPage" element={<JobPage />} />
        <Route path="/Friends" element={<Friends />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
      </Routes>
    </div>

  )
}

export default App
