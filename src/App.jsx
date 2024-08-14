import { useEffect, useState } from 'react'
import './App.css'
//Components
import Navbar from './components/navbar/Navbar'
import AppBody from './components/AppBody/AppBody'
//contexts
import { ModalContext } from './contexts/AllContexts.js'
//functions
import { fetchPopular, localData } from './functions.js';
import ModalComp from './components/ModalComp/ModalComp.jsx'

const filterArr = ["all", "movie", "tv", "bookmark"];

function App() {
  //states
  const [searchedItem, setSearchedItem] = useState(null);
  const [dummyData, setDummyData] = useState(); //this data is displayed on Trending and Recommendations sections
  const [categoreyName, setCategoreyName] = useState("all");
  const [bookmarkMap, setBookmarkMap] = useState(new Map());
  const [Modal, SetModal] = useState({position: "initial", data: {}});
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
    <ModalContext.Provider value={[Modal, SetModal]}>
      <Navbar 
        searchedItem={searchedItem} 
        closeSearch={closeSearch}
        handleCategoreyName = {handleCategoreyName}
        categoreyName = {categoreyName}
      />
      <AppBody 
        dummyData={dummyData} 
        searchedItem={searchedItem} 
        closeSearch={closeSearch} 
        handleSearchItem={handleSearchItem}
        categoreyName = {categoreyName}
        handleCategoreyName = {handleCategoreyName}
        bookmarkMap={bookmarkMap}
        handleBookMarks={handleBookMarks}
      />
      <ModalComp />
    </ModalContext.Provider>
  )
}

export default App
