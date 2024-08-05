import React from 'react';
//styles
import "./Trending.css"
//components
import TrendCard from '../TrendCard/TrendCard';


const Trending = props => {
    const { initialData } = props;
    // const initialData = []

    //functions
    const displayInitialData = () => {

        if(!initialData || !initialData?.length) return [<TrendCard noData={true}/>, <TrendCard noData={true}/>, <TrendCard noData={true}/>, <TrendCard noData={true}/>, <TrendCard noData={true}/>];
        

        return initialData.map(item => {
            if(item?.isTrending){
                const { year, category, rating, title, thumbnail } = item;
                return(
                    <TrendCard
                    item={item}
                        year = {year}
                        category = {category}
                        rating = {rating}
                        title = {title}
                        thumbnail = {thumbnail}
                    />
                )
            }
        })
    }
    return (
        <>
            <h1 >Trending</h1>
            <div className='flex gap-4 trendCardGrid'>
                {displayInitialData()}
            </div>
        </>
    );
};

export default Trending;