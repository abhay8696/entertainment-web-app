import React from 'react';
//styles
import "./RecomCard.css";
import "../../imageUrls.css"
//components
import CardTexts from '../CardTexts/CardTexts';
//assets
import bookmark from "../../assets/icon-bookmark-outline.svg";
//helper functions
import { transformString } from '../../functions';

const RecomCard = props => {
    const { year, category, rating, title, noData, thumbnail, trendImg } = props;

    let cardID = title;

    title === "1998" ? cardID = "NinteenNightyEight" : null;
    title === "112" ? cardID = "OneHundredAndTwelve" : null;

    return (
        <div className='RecomCardWrapper'>
            <div 
                className='RecomCard flex'
                id = {`${transformString(cardID)}-small`} //remove spaces nad special characters
                onClick={()=> console.log(title)}
            >
                <span className='cardButton flex items-center justify-center'>
                    <img src={bookmark} alt='bookmark' className='nav-icon mx-2'/>
                </span>
            </div>
            <div div className='CardTexts  flex flex-col items-start py-3 md:py-5 justify-between'>
                <CardTexts 
                    year = {year}
                    category = {category}
                    rating = {rating}
                    title = {title}
                    noData = {noData}
                />
            </div>
        </div>
    );
};

export default RecomCard;