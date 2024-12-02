import { useEffect, useState } from "react";
import "./App.css";
//Components
import Navbar from "./components/navbar/Navbar";
import AppBody from "./components/AppBody/AppBody";
//contexts
import { ModalContext } from "./contexts/AllContexts.js";
//functions
import { fetchTopRated, fetchTrending } from "./tmdb_functions.js";
import ModalComp from "./components/ModalComp/ModalComp.jsx";
import { localData } from "./functions.js";
import Authentication from "./components/Authentication/Authentication.jsx";
import { bookmark_Ops } from "./backend_functions.js";
import UserProfile from "./components/UserProfile/UserProfile.jsx";

const filterArr = ["all", "movie", "tv", "bookmark"];

function App() {
    //states
    const [searchedItem, setSearchedItem] = useState(null);
    const [dummyData, setDummyData] = useState(); //this data is displayed on Trending and Recommendations sections
    const [categoreyName, setCategoreyName] = useState("all");
    const [Modal, SetModal] = useState({ position: "initial", data: {} });
    const [TMDB_trending, SetTMDB_trending] = useState();
    const [TMDB_recommended, SetTMDB_recommended] = useState();
    const [authPage, setAuthPage] = useState({
        status: false,
        type: "register",
    });
    const [allBookmarks, setAllBookmarks] = useState(new Map());

    //on 1s load
    useEffect(() => {
        onLoad();
    }, []);

    useEffect(() => {
        const appBody = document.getElementById("AppBody");
        if (Modal.position === "up") appBody.classList.add("disableScroll");
        else appBody.classList.remove("disableScroll");
    }, [Modal]);

    //functions
    const onLoad = async () => {
        //get dummyData from local
        const dummyDataFromLocal = localData("dummyData");
        // const bookmarksFromLocal = localData("bookmarks");

        setDummyData(dummyDataFromLocal);
        // if (bookmarksFromLocal) setBookmarkMap(new Map(bookmarksFromLocal));

        const all = await fetchTrending("all");
        const movie = await fetchTrending("movie");
        const tv = await fetchTrending("tv");
        const recommendedMovies = await fetchTopRated("movie");
        const recommendedTV = await fetchTopRated("tv");

        if (all && movie && tv) SetTMDB_trending({ all, movie, tv });
        if (recommendedMovies && recommendedTV)
            SetTMDB_recommended({
                tv: recommendedTV,
                movie: recommendedMovies,
            });

        //get all bookmarks
        //only if user is looged in
        const userData = JSON.parse(window.localStorage.getItem("ewa_user"));
        if (userData) {
            const getBookmarks = await bookmark_Ops({
                method: "get",
                op_Type: "all",
                token: userData.token,
            });
            if (getBookmarks) updateAllBookmarks(getBookmarks);
        }
    };

    const updateAllBookmarks = (array) => {
        let newMap = new Map();
        array.forEach((item) => {
            const { tmdb_id, data } = item;
            newMap.set(tmdb_id, data);
        });

        setAllBookmarks(newMap);
    };

    const handleCategoreyName = (type) => {
        if (type === "bookmark") setSearchedItem(null);
        setCategoreyName(type);
        SetModal({ ...Modal, position: "down" });
    };

    const handleBookMarks = async (tmdb_id, data) => {
        //check if user is logged in
        //check if tmdb_id is present is allBookmarks map
        //if true delete, and call backend function
        //else add new, and call backend function
        //else display auth page

        const userData = JSON.parse(window.localStorage.getItem("ewa_user"));

        if (userData) {
            let method, op_Type;
            if (allBookmarks.has(tmdb_id)) {
                method = "delete";
                op_Type = "delete";
            } else {
                method = "post";
                op_Type = "new";
            }
            let updatedBookmarks = await bookmark_Ops({
                method,
                op_Type,
                tmdb_id,
                data,
                token: JSON.parse(window.localStorage.getItem("ewa_user"))
                    .token,
            });

            if (updatedBookmarks) updateAllBookmarks(updatedBookmarks);
        } else handleAuthPage(true, "login");
        console.log(userData);
    };

    const closeSearch = () => {
        setSearchedItem(null);
        setCategoreyName("all");
    };

    const handleSearchItem = (title, data) => {
        setSearchedItem({ title, data });
    };

    const logoClick_resetApp = () => {
        closeSearch();
        SetModal({ ...Modal, position: "down" });
    };

    const handleAuthPage = (status, type) => setAuthPage({ status, type });

    const displayAuthPage = () => {
        if (!authPage.status) return null;

        return (
            <Authentication
                type={authPage.type}
                handleAuthPage={handleAuthPage}
            />
        );
    };

    return (
        <ModalContext.Provider value={[Modal, SetModal]}>
            <Navbar
                searchedItem={searchedItem}
                closeSearch={closeSearch}
                handleCategoreyName={handleCategoreyName}
                categoreyName={categoreyName}
                logoClick_resetApp={logoClick_resetApp}
                handleAuthPage={handleAuthPage}
            />
            <AppBody
                dummyData={dummyData}
                searchedItem={searchedItem}
                closeSearch={closeSearch}
                handleSearchItem={handleSearchItem}
                categoreyName={categoreyName}
                handleCategoreyName={handleCategoreyName}
                allBookmarks={allBookmarks}
                handleBookMarks={handleBookMarks}
                TMDB_trending={TMDB_trending}
                TMDB_recommended={TMDB_recommended}
                handleAuthPage={handleAuthPage}
            />
            <ModalComp />
            {displayAuthPage()}
            <UserProfile />
        </ModalContext.Provider>
    );
}

export default App;
