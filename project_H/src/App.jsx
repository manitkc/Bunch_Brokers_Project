import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './Login/Login.jsx';
import HomePage from "./HomePage/HomePage.jsx";
import Registration from "./Registration/Registration.jsx";
import RegistrationTwo from "./RegistrationTwo/RegistrationTwo.jsx";
import RegistrationEducation from "./RegistrationEducation/RegistrationEducation.jsx";
import RegistrationSkills from "./RegistrationSkills/RegistrationSkills.jsx";
import RegistrationProjects from "./RegistrationProjects/RegistrationProjects.jsx";
import RegistrationAchievements from "./RegistrationAchievements/RegistrationAchievements.jsx";


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/RegistrationTwo" element={<RegistrationTwo />} />
        <Route path="/RegistrationEducation" element={<RegistrationEducation />} />
        <Route path="/RegistrationSkills" element={<RegistrationSkills />} />
        <Route path="/RegistrationProjects" element={<RegistrationProjects />} />
        <Route path="/RegistrationAchievements" element={<RegistrationAchievements />} />
      </Routes>
    </div>

  )
}

export default App
