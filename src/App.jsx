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
  const onLoad = () => {
    //get dummyData from local
    let data = window.localStorage.getItem("dummyData");
    if(data){
      console.log("dummyData found in local storage");
      data = JSON.parse(data);
      console.log(data)
    }
    else{//if not found save to local
      console.log("dummyData not found in local storage, getting from loadDummyData function")
      data = loadDummyData();
      console.log("saving data to local storage...")
      window.localStorage.setItem("dummyData", JSON.stringify(data));
    }

    //save data as state to pass down as props
    console.log("storing as state");
    setDummyData(data);
  };

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
