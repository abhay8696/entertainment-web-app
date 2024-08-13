import React from 'react';
//styles
import "./Trending.css"
//components
import Card from '../Card/Card';


const Trending = props => {
    const { dummyData, getOMDB, categoreyName, handleBookMarks, bookmarkMap  } = props;
    //functions
    const displayDummyData = () => {

        if(!dummyData || !dummyData?.length) return [<Card noData={true}/>, <Card noData={true}/>, <Card noData={true}/>, <Card noData={true}/>, <Card noData={true}/>];
        
        let count = 1;  

        return dummyData.map(item => {
            const { year, category, rating, title, thumbnail, id } = item;
            let customClassName = count===dummyData.length ? "trendCard-last" : `trendCard-${count++}`;

            if(item?.isTrending){
                if(category.toLowerCase().includes(categoreyName) || categoreyName == "all" || (categoreyName==="bookmark" && bookmarkMap.has(id))){
                    return(
                        <Card
                            bookmarkMap = {bookmarkMap}
                            handleBookMarks={handleBookMarks} 
                            year = {year}
                            category = {category}
                            rating = {rating}
                            title = {title}
                            thumbnail = {thumbnail}
                            getOMDB={getOMDB}
                            parentComp = "Trending"
                            key = {id}
                            cardID = {id}
                            allData= {item}
                            customClassName = {customClassName}
                        />
                    )
                }
            }
        })
    }
    return (
        <>
            <h1 className='px-4 md:px-0 lg:px-9'>Trending</h1>
            <marquee behavior="alternate" scrollamount="5">
                <div className='flex gap-4 trendCardGrid'>
                    {displayDummyData()}
                </div>
            </marquee>
        </>
    );
};

export default Trending;