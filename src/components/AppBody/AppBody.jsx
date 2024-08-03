import React from 'react';
//styles
import "./AppBody.css";
//components
import SearchComp from '../SearchComp/SearchComp';
import Trending from '../Trending/Trending';
import Recommendations from '../Recommendations/Recommendations';

const AppBody = () => {
    return (
        <div className='AppBody flex flex-col gap-6 md:gap-8 my-6 md:my-8'>
            <div className='px-4 md:px-0 lg:px-9'>
                <SearchComp />
            </div>
            <div className='trendingDiv flex flex-col gap-4 px-4 md:px-0 lg:px-9'>
                <Trending />
            </div>
            <div>
                <Recommendations />
            </div>
        </div>
    );
};

export default AppBody;