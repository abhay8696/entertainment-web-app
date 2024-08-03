import React from 'react';
//styles
import "./AppBody.css";
//components
import SearchComp from '../SearchComp/SearchComp';
import Trending from '../Trending/Trending';
import Recommendations from '../Recommendations/Recommendations';

const AppBody = () => {
    return (
        <div className='AppBody '>
            <SearchComp />
            <Trending />
            <Recommendations />
        </div>
    );
};

export default AppBody;