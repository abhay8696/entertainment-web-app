import React from 'react';
//styles
import "./Trending.css"
//components
import Card from '../Card/Card';


const Trending = props => {
    const { dummyData, getOMDB } = props;
    //functions
    const displayDummyData = () => {

        if(!dummyData || !dummyData?.length) return [<Card noData={true}/>, <Card noData={true}/>, <Card noData={true}/>, <Card noData={true}/>, <Card noData={true}/>];
        

        return dummyData.map(item => {
            if(item?.isTrending){
                const { year, category, rating, title, thumbnail, id } = item;
                return(
                    <Card
                        year = {year}
                        category = {category}
                        rating = {rating}
                        title = {title}
                        thumbnail = {thumbnail}
                        getOMDB={getOMDB}
                        parentComp = "Trending"
                        key = {id}
                    />
                )
            }
        })
    }
    return (
        <>
            <h1 >Trending</h1>
            <div className='flex gap-4 trendCardGrid'>
                {displayDummyData()}
            </div>
        </>
    );
};

export default Trending;