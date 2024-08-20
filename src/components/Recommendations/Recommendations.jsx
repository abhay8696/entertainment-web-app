import React from 'react';
//styles
// import "./Recommendations.css"
import "../../imageUrls.css"
//components
import Card from '../Card/Card';

const Recommendations = props => {
    const { TMDB_recommended, dummyData, categoreyName, handleBookMarks, bookmarkMap  } = props;

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
            if(!item) return <></>
            if(!item[0] || !item[1]) return <></>
            let { year, category, rating, title, thumbnail, id } = item[1];
            let { original_title, overview, popularity, media_type, poster_path, release_date, vote_average, original_name, name } = item[1];
            
            release_date ? release_date = release_date.split("-")[0] : null;
            poster_path ? poster_path = `https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}` : null;

            return(
                <Card
                    bookmarkMap = {bookmarkMap}
                    handleBookMarks={handleBookMarks} 
                    year = {year || release_date}
                    category = {category || media_type}
                    rating = {rating || vote_average}
                    title = {title || original_title || original_name || name}
                    poster = {thumbnail || poster_path}
                    parentComp = {"SearchResult"}
                    key = {id}
                    cardID = {id}
                    allData = {item[1]}
                />
            )
        })
    }

    const displayTMDB_cards = () => {
        if(!TMDB_recommended) return displayDummyData();

        let arr = [];

        if(categoreyName === "all"){    //mix movie and tv data
            for(let i = 0; i < TMDB_recommended.movie.length; i++){
                if(i % 2){
                    arr.push(TMDB_recommended.movie[i]);
                    arr[i].media_type = "movie";
                }
                else{
                    arr.push(TMDB_recommended.tv[i]);
                    arr[i].media_type = "tv";
                }
            }
        }else arr = TMDB_recommended[`${categoreyName}`];

        return arr.map(item => {
            let { id, original_title, overview, popularity, media_type, backdrop_path, poster_path, release_date, first_air_date, title, vote_average, original_name, name } = item;
            
            let year;
            release_date ? year = release_date : year = first_air_date;
            return(
                <Card
                    bookmarkMap = {bookmarkMap}
                    handleBookMarks={handleBookMarks} 
                    year = {year?.split("-")?.[0]}
                    category = {media_type}
                    rating = {vote_average}
                    title = {original_title || title || name || original_name}
                    thumbnail = {poster_path || backdrop_path}
                    poster = {poster_path || backdrop_path}
                    parentComp = "Recommendations"
                    key = {id}
                    cardID = {id}
                    allData= {item}
                />
            )
        })
    }

    return (
        <>
        <h1>{categoreyName !== "bookmark" ? "Recommended for you" : "Bookmarks"}</h1>
        <div className='flex gap-4 recomCardGrid grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
            {categoreyName !== "bookmark" ? displayTMDB_cards() : displayBookmarkCards()}
        </div>
        </>
    );
};

export default Recommendations;