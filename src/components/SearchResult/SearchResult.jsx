import React, { useEffect } from 'react';
// styles
import "./SearchResult.css";
//components
import Card from '../Card/Card';
const dummyImg = "https://imgs.search.brave.com/QrrF8yctvnxGKn5UBvuEt1XL7Pv04zXmzQ0y50RN5cY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzkxLzIyLzU5/LzM2MF9GXzc5MTIy/NTkyN19jYVJQUEg5/OUQ2RDFpRm9ua0NS/bUNHemtKUGYzNlFE/dy5qcGc"
const SearchResult = props => {
    const { bookmarkMap, handleBookMarks, data, categoreyName } = props;
    
    //functions
    const displayCards = () => {
        if(!data) return [];
        return data
        .filter(item => {
            if (categoreyName === "all") {
                return item.media_type === "movie" || item.media_type === "tv";
            }
            return item.media_type === categoreyName;
        })
        .map(item => {
            let { id, original_title, overview, popularity, media_type, backdrop_path, poster_path, release_date, title, vote_average, original_name, name } = item;
            
            poster_path ? poster_path = `https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}` : poster_path = dummyImg;
            return(
                <Card
                    bookmarkMap = {bookmarkMap}
                    handleBookMarks={handleBookMarks} 
                    year = {release_date?.split("-")?.[0]}
                    category = {media_type}
                    rating = {vote_average}
                    title = {original_title || title || name || original_name}
                    thumbnail = {poster_path || backdrop_path}
                    poster = {poster_path}
                    parentComp = "SearchResult"
                    key = {id}
                    cardID = {id}
                    allData= {item}
                />
            )
        })
    }

    return (
        <>
            <h1 >Result</h1>
            <div className='recomCardGrid grid gap-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4'>
                {/* <Card
                        bookmarkMap={bookmarkMap}
                        handleBookMarks={handleBookMarks} 
                        year = {Year}
                        category = {Type}
                        rating = {Rated}
                        title = {Title}
                        poster = {Poster}
                        data = {props.data}
                        parentComp = "SearchResult"
                        cardID = {imdbID}
                /> */}
                {displayCards()}
            </div>
        </>
    );
};

export default SearchResult;