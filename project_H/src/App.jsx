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
      </Routes>
    </div>

  )
}

export default App
