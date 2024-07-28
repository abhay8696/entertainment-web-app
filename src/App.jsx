import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1 className='text-xl font-bold text-red-500'>Entertainment Web App</h1>
        <Navbar />
      </div>
    </>
  )
}

export default App
