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
  const [bookmarkSet, setBookmarkSet] = useState(new Set());
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
    if(bookmarksFromLocal) setBookmarkSet(new Set(bookmarksFromLocal));

  };

  const handleCategoreyName = type => setCategoreyName(type);

  const handleBookMarks = (cardId) => {
    
    if(bookmarkSet.has(cardId)) bookmarkSet.delete(cardId);
    else  bookmarkSet.add(cardId);
    
    setBookmarkSet(new Set(bookmarkSet));

    // //save bookmarks to local storage
    const arrOfBookmarks = [];
    for(let i of bookmarkSet){
      arrOfBookmarks.push(i);
    }
    window.localStorage.setItem("bookmarks", JSON.stringify(arrOfBookmarks));
  }

  const closeSearch = ()=> {
    setSearchedItem({found: false});
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
        bookmarkSet={bookmarkSet}
      />
    </>
  )
}

export default App
