import React from 'react';
//styles
import "./TrendCard.css";
import "../../imageUrls.css"
//components
import CardTexts from '../CardTexts/CardTexts';
//assets
import bookmark from "../../assets/icon-bookmark-outline.svg";
import { transformString } from '../../functions';
//
const githubRepoAssetsLink = "https://github.com/abhay8696/entertainment-web-app/blob/main/src/"
const dummyUrl = "url(https://images.unsplash.com/photo-1722136682317-a06fda3ebeba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"

const TrendCard = props => {
    const { year, category, rating, title, noData, thumbnail, trendImg, getOMDB } = props;
    
    return (
        <div 
            className='TrendCard flex items-end'
            id = {title === "1998" ? "NinteenNightyEight-small" : `${transformString(title)}-small`} //remove spaces
            onClick={()=> getOMDB({title, year, type: category})}
        >
            <span className='cardButton flex items-center justify-center'>
                <img src={bookmark} alt='bookmark' className='nav-icon mx-2'/>
            </span>
            <div div className='CardTexts  flex flex-col items-start p-3 md:p-5 justify-between'>
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

export default TrendCard;