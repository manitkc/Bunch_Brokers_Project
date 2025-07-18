import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App({Aboutme} ) {

  console.log(Aboutme)
  

  return (
      <div>
      {Aboutme.map(person => (
        <div >
          <h3>{person.name}</h3>
          <p>{person.dateOfBirth}</p>
          <p>{person.school}</p>
           <p>{person.description}</p>
        </div>
      ))}
    </div>
   
  )
}

export default App
