import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import AppBody from './components/AppBody/AppBody'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <AppBody />
    </>
  )
}

export default App
