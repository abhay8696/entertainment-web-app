import React from 'react';
//styles
import "./Trending.css"
//components
import Card from '../Card/Card';


const Trending = props => {
    const { initialData, getOMDB } = props;
    // const initialData = []

    //functions
    const displayInitialData = () => {

        if(!initialData || !initialData?.length) return [<Card noData={true}/>, <Card noData={true}/>, <Card noData={true}/>, <Card noData={true}/>, <Card noData={true}/>];
        

        return initialData.map(item => {
            if(item?.isTrending){
                const { year, category, rating, title, thumbnail } = item;
                return(
                    <Card
                        year = {year}
                        category = {category}
                        rating = {rating}
                        title = {title}
                        thumbnail = {thumbnail}
                        getOMDB={getOMDB}
                        parentComp = "Trending"
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