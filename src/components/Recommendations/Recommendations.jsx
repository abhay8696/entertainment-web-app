import React from 'react';
//styles
import "./Recommendations.css"
//components
import RecomCard from '../RecomCard/RecomCard';

const Recommendations = () => {
    return (
        <>
        <h1 >Recommended for you</h1>
        <div className='flex gap-4 recomCardGrid grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
            <RecomCard /><RecomCard /><RecomCard /><RecomCard /><RecomCard /><RecomCard /><RecomCard /><RecomCard /><RecomCard /><RecomCard /><RecomCard /><RecomCard /><RecomCard /><RecomCard /><RecomCard /><RecomCard /><RecomCard /><RecomCard />
        </div>
        </>
    );
};

export default Recommendations;