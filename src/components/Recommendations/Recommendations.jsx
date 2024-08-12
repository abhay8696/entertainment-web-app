import React from 'react';
//styles
// import "./Recommendations.css"
import "../../imageUrls.css"
//components
import Card from '../Card/Card';

const Recommendations = props => {
    const { dummyData, categoreyName, handleBookMarks, bookmarkMap  } = props;

    //functions
    const displayDummyData = () => {

        if(!dummyData || !dummyData?.length) return [<Card noData={true}/>, <Card noData={true}/>, <Card noData={true}/>, <Card noData={true}/>, <Card noData={true}/>];
        

        return dummyData.map(item => {
            const { year, category, rating, title, thumbnail, id } = item;
            if(category?.toLowerCase().includes(categoreyName) || categoreyName == "all" || (categoreyName==="bookmark" && bookmarkMap.get(id))){
                return(
                    <Card
                        bookmarkMap = {bookmarkMap}
                        handleBookMarks={handleBookMarks} 
                        year = {year}
                        category = {category}
                        rating = {rating}
                        title = {title}
                        thumbnail = {thumbnail}
                        parentComp = {"Recommendations"}
                        key = {id}
                        cardID = {id}
                        allData = {item}
                    />
                )
            }
        })
    }

    const displayBookmarkCards = () => {
        const newArr = Array.from(bookmarkMap);

        if(!newArr.length) return [<p>{"No Bookmarks :("}</p>];

        return newArr.map(item => {
            let { year, category, rating, title, thumbnail, id } = item[1];
            let { original_title, overview, popularity, media_type, poster_path, release_date, vote_average } = item[1];
            
            release_date ? release_date = release_date.split("-")[0] : null;
            poster_path ? poster_path = `https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}` : null;

            return(
                <Card
                    bookmarkMap = {bookmarkMap}
                    handleBookMarks={handleBookMarks} 
                    year = {year || release_date}
                    category = {category || media_type}
                    rating = {rating || vote_average}
                    title = {title || original_title}
                    poster = {thumbnail || poster_path}
                    parentComp = {"SearchResult"}
                    key = {id}
                    cardID = {id}
                    allData = {item}
                />
            )
        })
    }

    return (
        <>
        <h1>{categoreyName !== "bookmark" ? "Recommended for you" : "Bookmarks"}</h1>
        <div className='flex gap-4 recomCardGrid grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
            {categoreyName !== "bookmark" ? displayDummyData() : displayBookmarkCards()}
        </div>
        </>
    );
};

export default Recommendations;