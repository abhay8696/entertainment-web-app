import React, { useEffect } from 'react';
// styles
import "./SearchResult.css";
//components
import Card from '../Card/Card';

const SearchResult = props => {
    const { bookmarkMap, handleBookMarks, data, categoreyName } = props;
    
    //functions
    const displayCards = () => {
        if(!data) return [];
        console.log(data)
        return data
        .filter(item => {
            if (categoreyName === "all") {
                return item.media_type === "movie" || item.media_type === "tv";
            }
            return item.media_type === categoreyName;
        })
        .map(item => {
            let { id, original_title, overview, popularity, media_type, backdrop_path, poster_path, release_date, title, vote_average, original_name, name } = item;
            
            return(
                <Card
                    bookmarkMap = {bookmarkMap}
                    handleBookMarks={handleBookMarks} 
                    year = {release_date?.split("-")?.[0]}
                    category = {media_type}
                    rating = {vote_average}
                    title = {original_title || title || name || original_name}
                    thumbnail = {poster_path || backdrop_path}
                    poster = {poster_path || backdrop_path}
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
                {data ? displayCards() : null}
            </div>
        </>
    );
};

export default SearchResult;