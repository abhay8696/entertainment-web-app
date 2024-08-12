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
        

        return dummyData.map(item => {
            const { year, category, rating, title, thumbnail, id } = item;

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
                        />
                    )
                }
            }
        })
    }
    return (
        <>
            <h1 >Trending</h1>
            <div className='flex gap-4 trendCardGrid '>
            {/* <marquee> */}
                {displayDummyData()}
            {/* </marquee> */}
            </div>
        </>
    );
};

export default Trending;