import React from 'react';
// styles
import "./SearchResult.css";
//components
import Card from '../Card/Card';

const SearchResult = props => {
    const { Year, Type, Rated, Title, Poster } = props.data;

    return (
        <>
            <h1 >Result</h1>
            <div className='flex gap-4 recomCardGrid grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                <Card
                        year = {Year}
                        category = {Type}
                        rating = {Rated}
                        title = {Title}
                        poster = {Poster}
                        data = {props.data}
                        parentComp = "SearchResult"
                />
            </div>
        </>
    );
};

export default SearchResult;