import React, { useEffect } from 'react';
// styles
import "./SearchResult.css";
//components
import Card from '../Card/Card';

const SearchResult = props => {
    const { bookmarkSet, handleBookMarks, data, categoreyName } = props;
    
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
            const { id, original_title, overview, popularity, media_type, poster_path, release_date, title, vote_average } = item;
            
            return(
                <Card
                    bookmarkSet = {bookmarkSet}
                    handleBookMarks={handleBookMarks} 
                    year = {release_date?.split("-")?.[0]}
                    category = {media_type}
                    rating = {vote_average}
                    title = {original_title}
                    thumbnail = {poster_path}
                    poster = {`https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}`}
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
                        bookmarkSet={bookmarkSet}
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