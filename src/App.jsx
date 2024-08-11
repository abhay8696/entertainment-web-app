import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import AppBody from './components/AppBody/AppBody'
//functions
import { localData } from './functions.js';

const filterArr = ["all", "movie", "tv", "bookmark"];

function App() {
  //states
  const [searchedItem, setSearchedItem] = useState({ found: false });
  const [dummyData, setDummyData] = useState(); //this data is displayed on Trending and Recommendations sections
  const [categoreyName, setCategoreyName] = useState("all");
  const [bookmarkSet, setBookmarkSet] = useState(new Set());
  //on 1s load
  useEffect(()=> {
      onLoad();
  }, []);

  //functions
  const onLoad = () => {
    //get dummyData from local
    const dataFromLocal = localData();

    setDummyData(dataFromLocal);
  };

  const handleCategoreyName = type => setCategoreyName(type);

  const handleBookMarks = (cardId, type) => {
    if(type === "add") setBookmarkSet(new Set([...bookmarkSet, cardId]));
    if(type === "remove"){
      bookmarkSet.delete(cardId);
      setBookmarkSet([...bookmarkSet]);
    }
  }

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
        handleCategoreyName = {handleCategoreyName}
        categoreyName = {categoreyName}
      />
      <AppBody 
        searchedItem={searchedItem} 
        dummyData={dummyData} 
        closeSearch={closeSearch} 
        handleSearchItem={handleSearchItem}
        categoreyName = {categoreyName}
        handleBookMarks={handleBookMarks}
        bookmarkSet={bookmarkSet}
      />
    </>
  )
}

export default App
