import React from 'react';
//styles
import "./Navbar.css";
//assets
import logo from "../../assets/logo.svg";
import all from "../../assets/icon-nav-home.svg";
import allWhite from "../../assets/icon-nav-home-white.svg";
import tv from "../../assets/icon-nav-tv-series.svg";
import tvWhite from "../../assets/icon-nav-tv-series-white.svg";
import movie from "../../assets/icon-nav-movies.svg";
import movieWhite from "../../assets/icon-nav-movies-white.svg";
import bookmark from "../../assets/icon-nav-bookmark.svg";
import bookmarkWhite from "../../assets/icon-nav-bookmark-white.svg";
import displayPicture from "../../assets/image-avatar.png";

/*
class names "greyfill", "redFill", "whiteFill" are declared in index.css
*/


//values for svgs
const Navbar = props => {
    const { closeSearch, handleCategoreyName, categoreyName, logoClick_resetApp } = props;

    //functions
    const displayNavButtons = () => {
        const items = ["all", "movie", "tv", "bookmark"];
        const imgSrc = [all, movie, tv, bookmark];
        const imgSrcWhite = [allWhite, movieWhite, tvWhite, bookmarkWhite];
        const arr = [];
        
        items.map((item, index) => {
            arr.push(
                <img 
                    onClick={()=>handleCategoreyName(item)}
                    src={categoreyName === item ? imgSrcWhite[index] : imgSrc[index]}
                    alt={`${items}-icon`}
                    className='nav-icon mx-2'
                />
            )
        })

        return arr;
    }

    return (
        <nav className='w-screen md:w-auto lg:w-24 lg:py-8 lg:h-full lg:gap-20 flex items-center justify-between p-4 lg:flex-col'>
            <img src={logo} alt='logo' className='w-7 appLogo' onClick={logoClick_resetApp}/>
            <span className='flex items-center justify-between lg:justify-start sm:gap-5 lg:gap-10 lg:grow lg:flex-col '>
                {displayNavButtons()}
            </span>
            <span className='dpWrapper flex items-center justify-center'>
                <img src={displayPicture} alt='display picture' className='displayPicture'/>
            </span>
        </nav>
    );
};

export default Navbar;