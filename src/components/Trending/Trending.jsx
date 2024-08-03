import React from 'react';
//styles
import "./Trending.css"
//components
import TrendCard from '../TrendCard/TrendCard';


const Trending = () => {
    return (
        <div className='trendingDiv flex flex-col gap-4'>
            <h1 className='text-left px-4'>Trending</h1>
            <div className='flex gap-4 trendCardGrid px-4'>
                <TrendCard />
                <TrendCard />
                <TrendCard />
                <TrendCard />
            </div>
        </div>
    );
};

export default Trending;