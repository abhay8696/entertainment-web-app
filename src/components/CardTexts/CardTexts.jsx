import React from 'react';
//styles
import "./CardTexts.css";
//assets
import tvIcon from "../../assets/icon-nav-tv-series.svg";
import movieIcon from "../../assets/icon-nav-movies.svg";
import bigDot from "../../assets/big-dot.svg";

const CardTexts = () => {
    return (
        <div className='CardTexts flex flex-col items-start p-3 md:p-5 justify-between'>
            <div className='cardInfoWrapper flex items-center justify-center gap-2'>
                <span className='cardInfo cardYear'>2019</span>
                <img src={bigDot} alt='big dot'/>
                <span className='cardInfo cardType flex items-center justify-center gap-2'>
                    <img src={movieIcon} alt="card type icon" className='cardInfoImg'/>
                    <span>movie</span>
                </span>
                <img src={bigDot} alt='big dot'/>
                <span className='cardInfo cardRating'>pg</span>
            </div>
            <h4 className='cardName'>earth</h4>
        </div>
    );
};

export default CardTexts;