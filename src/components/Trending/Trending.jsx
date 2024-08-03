import React from 'react';
//styles
import "./Trending.css"
//components
import TrendCard from '../TrendCard/TrendCard';


const Trending = () => {
    return (
        <>
            <h1 >Trending</h1>
            <div className='flex gap-4 trendCardGrid'>
                <TrendCard />
                <TrendCard />
                <TrendCard />
                <TrendCard />
            </div>
        </>
    );
};

export default Trending;