import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


const Aboutme = [
  {
    name:"Manit ",
    dateOfBirth: "27/09/2005",
    school: "Auckland University",
    description: "Studying software enginnering at Uoa"

  },
  {

     name:"Dave ",
    dateOfBirth: "15/02/2005",
     School: "Auckkland University",
     description: "Studying software enginnering at Uoa"

  }

]


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App
    Aboutme = {Aboutme}
     />
  </StrictMode>,
)
