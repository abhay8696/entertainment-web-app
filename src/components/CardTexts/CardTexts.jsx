import React from 'react';
//styles
import "./CardTexts.css";
//assets
import tvIcon from "../../assets/icon-nav-tv-series.svg";
import movieIcon from "../../assets/icon-nav-movies.svg";
import bigDot from "../../assets/big-dot.svg";
import { trim_string } from '../../functions';

const CardTexts = props => {
    const { year, category, rating, title, noData, name, characterName, parentComp } = props;


    const DisplayCardInfo = () => {
        if(parentComp === "ModalComp") return null;
        return(
            <div className='cardInfoWrapper flex items-center justify-center gap-2'>
                <span className='cardInfo cardYear'>{year}</span>
                <img src={bigDot} alt='big dot'/>
                <span className='cardInfo cardType flex items-center justify-center gap-2'>
                    <img src={category === "movie" ? movieIcon : tvIcon} alt="card type icon" className='cardInfoImg'/>
                    <span>{category}</span>
                </span>
                <img src={bigDot} alt='big dot'/>
                <span className='cardInfo cardRating'>{rating}</span>
            </div>
        )
    }

    const DisplayCardTitle = () => {
        if(parentComp === "ModalComp") {
            return <h4 className='cardName text-sm'>{name || "Loading..."}</h4>
        }

        return <h4 className='cardName '>{trim_string(title, 60) || "Loading..."}</h4>
    }
    const DisplayCharacterName = () => {
        if(!characterName) return null;
        return (
            <span className='text-xs'>
                <span className='opacity-50'>{"as "}</span> 
                {characterName}
            </span>
        )
    }
    return (
        <>
            <DisplayCardInfo />
            <DisplayCardTitle />
            <DisplayCharacterName />
        </>
    );
};

export default CardTexts;