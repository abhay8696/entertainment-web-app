import React from 'react';
//styles
// import "./Recommendations.css"
import "../../imageUrls.css"
//components
import Card from '../Card/Card';

const Recommendations = props => {
    const { initialData } = props;

    //functions
    const displayInitialData = () => {

        if(!initialData || !initialData?.length) return [<Card noData={true}/>, <Card noData={true}/>, <Card noData={true}/>, <Card noData={true}/>, <Card noData={true}/>];
        

        return initialData.map(item => {
            if(item){
                const { year, category, rating, title, thumbnail } = item;
                return(
                    <Card
                        year = {year}
                        category = {category}
                        rating = {rating}
                        title = {title}
                        thumbnail = {thumbnail}
                        parentComp = {"Recommendations"}
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