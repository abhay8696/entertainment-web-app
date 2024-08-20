import React from 'react';
//styles
import "./Trending.css"
//components
import Card from '../Card/Card';



const Trending = props => {
    const { TMDB_trending, dummyData, getOMDB, categoreyName, handleBookMarks, bookmarkMap  } = props;
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

    const displayTMDB_trending = () => {
        if(!TMDB_trending) return displayDummyData();
        
        return TMDB_trending?.[`${categoreyName}`]
        .filter(item => {
            if (categoreyName === "all") {
                return item.media_type === "movie" || item.media_type === "tv";
            }
            return item.media_type === categoreyName;
        })
        .map(item => {
            let { id, original_title, overview, popularity, media_type, backdrop_path, poster_path, release_date, title, vote_average, original_name, name } = item;
            
            poster_path ? poster_path = `https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}` : poster_path = dummyImg;
            return(
                <Card
                    bookmarkMap = {bookmarkMap}
                    handleBookMarks={handleBookMarks} 
                    year = {release_date?.split("-")?.[0]}
                    category = {media_type}
                    rating = {vote_average}
                    title = {original_title || title || name || original_name}
                    thumbnail = {poster_path || backdrop_path}
                    poster = {poster_path || backdrop_path}
                    parentComp = "Trending"
                    key = {id}
                    cardID = {id}
                    allData= {item}
                />
            )
        })

    }
    return (
        <>
            <h1 className='px-4 md:px-0 lg:px-9'>Trending</h1>
            <marquee behavior="alternate" scrollamount="5">
                <div className='flex gap-4 trendCardGrid'>
                    {/* {displayDummyData()} */}
                    {TMDB_trending ? displayTMDB_trending() : displayDummyData()}
                </div>
            </marquee>
        </>
    );
};

export default Trending;