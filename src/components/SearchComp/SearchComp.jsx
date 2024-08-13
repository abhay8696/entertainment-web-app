import React, { useRef, useState } from 'react';
//styles
import "./SearchComp.css";
//assets
import searchIcon from "../../assets/icon-search.svg";

const SearchComp = props => {
    const { getTMDB, handleSearchItem, handleCategoreyName, categoreyName } = props;
    //states 
    const [text, setText] = useState("");
    //refs
    const inputRef = useRef(null);
    //functions
    const handleChange = evt => {
        setText(pre=> evt.target.value);
        if(categoreyName !== "all") handleCategoreyName("all");

        if(!evt.target.value.length){
            handleSearchItem(null);
            // handleCategoreyName("all");
        }
    }
    const handleSubmit = evt => {
        evt.preventDefault();
        getTMDB(text);
        if(inputRef.current) inputRef.current.blur();
    }
    
    return (
        <form className='SearchComp flex items-center justify-start gap-2' onSubmit={handleSubmit}>
            <label htmlFor="searchText flex items-center justify-center">
                <img src={searchIcon} alt='search icon' className='searchIcon w-7' />
            </label>
            <input 
                ref={inputRef}
                className='searchInput flex-1 py-2' 
                onChange={handleChange}
                value={text}
                placeholder='Search for movies or TV series'
                id='searchText'
                required
            />
        </form>
    );
};

export default SearchComp;