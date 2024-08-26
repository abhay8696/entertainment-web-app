import { useEffect, useState } from 'react'
import './App.css'
//Components
import Navbar from './components/navbar/Navbar'
import AppBody from './components/AppBody/AppBody'
//contexts
import { ModalContext } from './contexts/AllContexts.js'
//functions
import { fetchTopRated, fetchTrending } from './tmdb_functions.js';
import ModalComp from './components/ModalComp/ModalComp.jsx'
import { localData } from './functions.js'

const filterArr = ["all", "movie", "tv", "bookmark"];

function App() {
  //states
  const [searchedItem, setSearchedItem] = useState(null);
  const [dummyData, setDummyData] = useState(); //this data is displayed on Trending and Recommendations sections
  const [categoreyName, setCategoreyName] = useState("all");
  const [bookmarkMap, setBookmarkMap] = useState(new Map());
  const [Modal, SetModal] = useState({position: "initial", data: {}});
  const [TMDB_trending, SetTMDB_trending] = useState();
  const [TMDB_recommended, SetTMDB_recommended] = useState();
  //on 1s load
  useEffect(()=> {
      onLoad();
  }, []);

  useEffect(()=> {
    const appBody = document.getElementById("AppBody");
    if(Modal.position === "up") appBody.classList.add("disableScroll");
    else appBody.classList.remove("disableScroll");
  }, [Modal])

  //functions
  const onLoad = async () => {
    //get dummyData from local
    const dummyDataFromLocal = localData("dummyData");
    const bookmarksFromLocal = localData("bookmarks");

    setDummyData(dummyDataFromLocal);
    if(bookmarksFromLocal) setBookmarkMap(new Map(bookmarksFromLocal));

    const all = await fetchTrending("all");
    const movie = await fetchTrending("movie");
    const tv = await fetchTrending("tv");
    const recommendedMovies = await fetchTopRated("movie");
    const recommendedTV = await fetchTopRated("tv");

    if(all && movie && tv) SetTMDB_trending({all, movie, tv});
    if(recommendedMovies && recommendedTV) SetTMDB_recommended({tv: recommendedTV, movie: recommendedMovies});

  };

  const handleCategoreyName = type => {
    if(type === "bookmark") setSearchedItem(null);
    setCategoreyName(type);
    SetModal({...Modal, position: "down"});
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
  
  const handleSearchItem = (title, data) => {
    setSearchedItem({title, data});
  }

  const logoClick_resetApp = () => {
    closeSearch();
    SetModal({...Modal, position: "down"});
  }

  return (
    <ModalContext.Provider value={[Modal, SetModal]}>
      <Navbar 
        searchedItem={searchedItem} 
        closeSearch={closeSearch}
        handleCategoreyName = {handleCategoreyName}
        categoreyName = {categoreyName}
        logoClick_resetApp = {logoClick_resetApp}
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
        TMDB_trending={TMDB_trending}
        TMDB_recommended={TMDB_recommended}
      />
      <ModalComp />
    </ModalContext.Provider>
  )
}

export default App
