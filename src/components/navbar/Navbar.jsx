import React from 'react';
//styles
import "./Navbar.css";
//assets
import logo from "../../assets/logo.svg";
import home from "../../assets/icon-nav-home.svg";
import tv from "../../assets/icon-nav-tv-series.svg";
import movies from "../../assets/icon-nav-movies.svg";
import bookmark from "../../assets/icon-nav-bookmark.svg";
import displayPicture from "../../assets/image-avatar.png";

/*
class names "greyfill", "redFill", "whiteFill" are declared in index.css
*/


//values for svgs
const Navbar = props => {
    const { closeSearch } = props;
    return (
        <nav className='w-screen md:w-auto lg:w-24 lg:py-8 lg:h-full lg:gap-20 flex items-center justify-between p-4 lg:flex-col'>
            <img src={logo} alt='logo' className='w-7 appLogo' onClick={()=> closeSearch()}/>
            <span className='flex items-center justify-between lg:justify-start sm:gap-5 lg:gap-10 lg:grow lg:flex-col '>
                <img src={home} alt='home' className='nav-icon mx-2'/>
                <img src={movies} alt='movies' className='nav-icon mx-2'/>
                <img src={tv} alt='tv' className='nav-icon mx-2'/>
                <img src={bookmark} alt='bookmark' className='nav-icon mx-2'/>
            </span>
            <span className='dpWrapper flex items-center justify-center'>
                <img src={displayPicture} alt='display picture' className='displayPicture'/>
            </span>
        </nav>
    );
};

export default Navbar;