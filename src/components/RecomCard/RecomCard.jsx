import React from 'react';
//styles
import "./RecomCard.css";
//components
import CardTexts from '../CardTexts/CardTexts';
//assets
import bookmark from "../../assets/icon-bookmark-outline.svg";

const RecomCard = () => {
    return (
        <div className='RecomCardWrapper'>
            <div 
                className='RecomCard flex'
                style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1722136682317-a06fda3ebeba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`
                }}
            >
                <span className='cardButton flex items-center justify-center'>
                    <img src={bookmark} alt='bookmark' className='nav-icon mx-2'/>
                </span>
            </div>
            <div div className='CardTexts  flex flex-col items-start py-3 md:py-5 justify-between'>
                <CardTexts />
            </div>
        </div>
    );
};

export default RecomCard;