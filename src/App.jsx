import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import AppBody from './components/AppBody/AppBody'
//data
import loadDummyData from './initialData.js';

function App() {
  //states
  const [searchedItem, setSearchedItem] = useState({ found: false });
  const [dummyData, setDummyData] = useState(); //this data is displayed on Trending and Recommendations sections

  //on 1s load
  useEffect(()=> {
      onLoad();
  }, []);

  //functions
  const onLoad = () => setDummyData(loadDummyData());

  const closeSearch = ()=> {
    setSearchedItem({found: false});
  }
  
  const handleSearchItem = data => {
    setSearchedItem(data);
  }

  return (
    <>
      <Navbar 
        searchedItem={searchedItem} 
        closeSearch={closeSearch}
      />
      <AppBody 
        searchedItem={searchedItem} 
        dummyData={dummyData} 
        closeSearch={closeSearch} 
        handleSearchItem={handleSearchItem}
      />
    </>
  )
}

export default App
