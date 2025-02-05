import React, { useEffect, useRef, useState } from "react";
//styles
import "./SearchComp.css";
//assets
import searchIcon from "../../assets/icon-search.svg";

const SearchComp = (props) => {
    const {
        getTMDB,
        handleSearchItem,
        handleCategoreyName,
        categoreyName,
        closeSearch,
        searchedItem,
    } = props;
    //states
    const [text, setText] = useState("");
    const [suggestionsResult, setSuggestionsResult] = useState([]);
    //refs
    const inputRef = useRef(null);

    //side effects on input change
    // Debounce function
    useEffect(() => {
        if (text.length < 3) return;

        const delayDebounceFn = setTimeout(() => getTMDB(text), 500); // Wait for 500ms after user stops typing

        return () => clearTimeout(delayDebounceFn); // Cleanup the timeout
    }, [text]);

    //functions
    const handleChange = (evt) => {
        let value = evt.target.value;
        if (categoreyName !== "all") handleCategoreyName("all");

        if (!value.length) {
            closeSearch();
        }
        setText(value);
    };
    const handleSubmit = (evt) => {
        evt.preventDefault();
        getTMDB(text);
        setText("");
        if (inputRef.current) inputRef.current.blur();
    };
    const clearForm = (event) => {
        event.preventDefault();
        setText("");
        closeSearch();
    };
    const button = (
        <span
            onClick={clearForm}
            className="cursor-pointer bg-greyish-blue text-sm px-2 py-1 rounded-md"
        >
            Close
        </span>
    );

    return (
        <form
            className="relative SearchComp flex items-center justify-start gap-2"
            onSubmit={handleSubmit}
        >
            <label htmlFor="searchText flex items-center justify-center">
                <img
                    src={searchIcon}
                    alt="search icon"
                    className="searchIcon w-7"
                />
            </label>
            <input
                ref={inputRef}
                className="searchInput flex-1 py-2"
                onChange={handleChange}
                value={text}
                placeholder="Search for movies or TV series"
                id="searchText"
                required
            />
            {text.length || searchedItem ? button : null}
        </form>
    );
};

export default SearchComp;
