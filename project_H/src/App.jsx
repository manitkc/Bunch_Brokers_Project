import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProfilePage from './ProfilePage/ProfilePage.jsx'
import JobPage from './JobPage/JobPage.jsx'
function App({Aboutme} ) {

  console.log(Aboutme)
  

  return (
    <div className="App">

    <JobPage/>
    </div>
   
  )
}

export default App
