import React, { useState } from 'react';
//styles
import "./SearchComp.css";
//assets
import searchIcon from "../../assets/icon-search.svg";

const SearchComp = props => {
    const { getTMDB, handleSearchItem, handleCategoreyName } = props;
    //states 
    const [text, setText] = useState("");
    //functions
    const handleChange = evt => {
        setText(pre=> evt.target.value);
        if(!evt.target.value.length){
            handleSearchItem(null);
            // handleCategoreyName("all");
        }
    }
    const handleSubmit = evt => {
        evt.preventDefault();
        getTMDB(text);
    }
    
    return (
        <form className='SearchComp flex items-center justify-start gap-2' onSubmit={handleSubmit}>
            <label htmlFor="searchText flex items-center justify-center">
                <img src={searchIcon} alt='search icon' className='searchIcon w-7' />
            </label>
            <input 
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