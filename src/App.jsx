import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import AppBody from './components/AppBody/AppBody'
//functions
import { fetchPopular, localData } from './functions.js';

const filterArr = ["all", "movie", "tv", "bookmark"];

function App() {
  //states
  const [searchedItem, setSearchedItem] = useState(null);
  const [dummyData, setDummyData] = useState(); //this data is displayed on Trending and Recommendations sections
  const [categoreyName, setCategoreyName] = useState("all");
  const [bookmarkMap, setBookmarkMap] = useState(new Map());
  //on 1s load
  useEffect(()=> {
      onLoad();
  }, []);

  //functions
  const onLoad = async () => {
    //get dummyData from local
    const dummyDataFromLocal = localData("dummyData");
    const bookmarksFromLocal = localData("bookmarks");

    setDummyData(dummyDataFromLocal);
    if(bookmarksFromLocal) setBookmarkMap(new Map(bookmarksFromLocal));

  };

  const handleCategoreyName = type => {
    if(type === "bookmark") setSearchedItem(null);
    setCategoreyName(type);
  }

  const handleBookMarks = (id, data) => {
    
    if(bookmarkMap.has(id)) bookmarkMap.delete(id);
    else  bookmarkMap.set(id, data);
    
    setBookmarkMap(new Map(bookmarkMap));

    // //save bookmarks to local storage by converting map into arr 
    window.localStorage.setItem("bookmarks", JSON.stringify(Array.from(bookmarkMap)));
  }

  const closeSearch = ()=> {
    setSearchedItem(null);
    setCategoreyName("all");
  }
  
  const handleSearchItem = (data) => {
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
        handleCategoreyName = {handleCategoreyName}
        categoreyName = {categoreyName}
        handleBookMarks={handleBookMarks}
        bookmarkMap={bookmarkMap}
      />
    </>
  )
}

export default App
