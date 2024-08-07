import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import AppBody from './components/AppBody/AppBody'

function App() {
  //states
  const [searchedItem, setSearchedItem] = useState({
      found: false
  });
  //functions
  const closeSearch = ()=> {
    setSearchedItem = {found: false};
  }
  
  const handleSearchItem = data => {
    setSearchedItem(data);
  }

  return (
    <>
      <Navbar searchedItem={searchedItem} closeSearch={closeSearch}/>
      <AppBody searchedItem={searchedItem} closeSearch={closeSearch} handleSearchItem={handleSearchItem}/>
    </>
  )
}

export default App
