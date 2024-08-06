import React from 'react';
//styles
import "./Card.css";
import "../../imageUrls.css"
//components
import CardTexts from '../CardTexts/CardTexts';
//assets
import bookmark from "../../assets/icon-bookmark-outline.svg";
//helper functions
import { transformString } from '../../functions';

const Card = props => {
    const { year, category, rating, title, noData, thumbnail, trendImg, poster, parentComp } = props;

    let cardID = title;

    title === "1998" ? cardID = "NinteenNightyEight" : null;
    title === "112" ? cardID = "OneHundredAndTwelve" : null;

    const createClassName = () => {
        if(parentComp === "Recommendations") return 'Card flex RecomCard';
        if(parentComp === "SearchResult") return 'Card flex SearchCard';
        
        return 'Card flex';
    }

    return (
        <div className='CardWrapper'>
            <div 
                className={`Card flex ${parentComp}-card`}
                id = {`${transformString(cardID)}-small`} //remove spaces nad special characters
                onClick={()=> console.log(title)}
                style={{
                    backgroundImage: poster ? `url(${poster})` : ""
                }}
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

export default Card;