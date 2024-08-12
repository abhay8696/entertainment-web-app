import React from 'react';
//styles
import "./Card.css";
import "../../imageUrls.css"
//components
import CardTexts from '../CardTexts/CardTexts';
//assets
import bookmark from "../../assets/icon-bookmark-outline.svg";
import bookmarkWhite from "../../assets/icon-bookmark-white-small.svg";
//helper functions
import { transformString } from '../../functions';

const Card = props => {
    const { allData, year, category, rating, title, noData, thumbnail, trendImg, poster, parentComp, bookmarkSet, handleBookMarks, cardID } = props;

    let cardTitle = title;

    title === "1998" ? cardTitle = "NinteenNightyEight" : null;
    title === "112" ? cardTitle = "OneHundredAndTwelve" : null;
    
    const displayInfo = (padding)=> {
        return(
            <div div className={`CardTexts flex flex-col items-start ${padding} justify-between`}>
                <CardTexts 
                    year = {year}
                    category = {category}
                    rating = {rating}
                    title = {title}
                    noData = {noData}
                />
            </div>
        )
    }

    return (
        <div className='CardWrapper'>
            <div 
                className={`Card flex ${parentComp}-card`}
                id = {`${transformString(cardTitle)}-small`} //remove spaces nad special characters
                style={{
                    backgroundImage: poster ? `url(${poster})` : ""
                }}
                onClick={()=> console.log(allData)}
            >
                <span onClick={()=> handleBookMarks(cardID)} className='cardButton flex items-center justify-center'>
                    <img 
                        src={bookmarkSet.has(cardID) ? bookmarkWhite : bookmark} 
                        alt='bookmark' 
                        className='nav-icon mx-2'
                    />
                </span>
                {
                    parentComp === "Trending" ? displayInfo("p-3 md:p-5") : null
                }
            </div>
            {
                parentComp != "Trending" ? displayInfo("py-3 md:py-5") : null
            }
        </div>
    );
};

export default Card;