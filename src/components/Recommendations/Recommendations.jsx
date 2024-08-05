import React from 'react';
//styles
// import "./Recommendations.css"
import "../../imageUrls.css"
//components
import RecomCard from '../RecomCard/RecomCard';

const Recommendations = props => {
    const { initialData } = props;

    //functions
    const displayInitialData = () => {

        if(!initialData || !initialData?.length) return [<RecomCard noData={true}/>, <RecomCard noData={true}/>, <RecomCard noData={true}/>, <RecomCard noData={true}/>, <RecomCard noData={true}/>];
        

        return initialData.map(item => {
            if(item){
                const { year, category, rating, title, thumbnail } = item;
                return(
                    <RecomCard
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
        <h1 >Recommended for you</h1>
        <div className='flex gap-4 recomCardGrid grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
            {displayInitialData()}
        </div>
        </>
    );
};

export default Recommendations;