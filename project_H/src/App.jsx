import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './Login/Login.jsx';
import HomePage from "./HomePage/HomePage.jsx";
import JobPage from "./JobPage/JobPage.jsx";
import Friends from './Friends/Friends.jsx';
import ProfilePage from './ProfilePage/ProfilePage.jsx';
import supabase from "./SupabaseClient.js";
import Registration from "./Registration/Registration.jsx";
import RegistrationSkills from "./RegistrationSkills/RegistrationSkills.jsx";
import RegistrationProjects from "./RegistrationProjects/RegistrationProjects.jsx";
import RegistrationAchievements from "./RegistrationAchievements/RegistrationAchievements.jsx";
import RegistrationTwo from "./RegistrationTwo/RegistrationTwo.jsx";
import RegistrationEducation from "./RegistrationEducation/RegistrationEducation.jsx";

function App() {

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user }, error }) => {
            if (error) console.error("Error fetching user:", error);
            else if (user) setUserId(user.id);
        });
    }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/HomePage" element={<HomePage userId={userId} />} />
        <Route path="/JobPage" element={<JobPage />} />
        <Route path="/Friends" element={<Friends />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/RegistrationSkills" element={<RegistrationSkills />} />
        <Route path="/RegistrationProjects" element={<RegistrationProjects />} />
        <Route path="/RegistrationAchievements" element={<RegistrationAchievements />} />
        <Route path="/RegistrationTwo" element={<RegistrationTwo />} />
        <Route path="/RegistrationEducation" element={<RegistrationEducation />} />
      </Routes>
    </div>

  )
}

export default App
