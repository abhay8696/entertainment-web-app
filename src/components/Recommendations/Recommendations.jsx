import React from 'react';
//styles
// import "./Recommendations.css"
import "../../imageUrls.css"
//components
import Card from '../Card/Card';

const Recommendations = props => {
    const { dummyData, categoreyName, handleBookMarks, bookmarkSet  } = props;

    //functions
    const displayDummyData = () => {

        if(!dummyData || !dummyData?.length) return [<Card noData={true}/>, <Card noData={true}/>, <Card noData={true}/>, <Card noData={true}/>, <Card noData={true}/>];
        

        return dummyData.map(item => {
            const { year, category, rating, title, thumbnail, id } = item;
            if(category?.toLowerCase().includes(categoreyName) || categoreyName == "all" || (categoreyName==="bookmark" && bookmarkSet.has(id))){
                return(
                    <Card
                        bookmarkSet = {bookmarkSet}
                        handleBookMarks={handleBookMarks} 
                        year = {year}
                        category = {category}
                        rating = {rating}
                        title = {title}
                        thumbnail = {thumbnail}
                        parentComp = {"Recommendations"}
                        key = {id}
                        cardID = {id}
                    />
                )
            }
        })
    }

    return (
        <>
        <h1 >Recommended for you</h1>
        <div className='flex gap-4 recomCardGrid grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
            {displayDummyData()}
        </div>
        </>
    );
};

export default Recommendations;