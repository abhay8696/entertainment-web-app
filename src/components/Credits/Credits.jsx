import React from 'react';
//styles
import "./Credits.css";
//components
import MiniCard from '../MiniCard/MiniCard';
import { trim_string } from '../../functions';

const dummyImg = "https://imgs.search.brave.com/QrrF8yctvnxGKn5UBvuEt1XL7Pv04zXmzQ0y50RN5cY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzkxLzIyLzU5/LzM2MF9GXzc5MTIy/NTkyN19jYVJQUEg5/OUQ2RDFpRm9ua0NS/bUNHemtKUGYzNlFE/dy5qcGc";

const Credits = props => {
    const { people, type } = props;
    //functions
    const displayCardArr = () => {
        return people.map(actor => {
            const { adult, gender, id, known_for_department, name, original_name, popularity, profile_path, cast_id, character, credit_id, order }
            = actor;
            return(
                <MiniCard 
                    name = {trim_string(`${name || original_name}`, 15)}
                    profile_path = {profile_path}
                    characterName = {trim_string(character, 19)}
                    allData = {actor}
                    key = {`creditsCard-${id}`}
                    parentComp = {type}
                    role = {known_for_department}
                />
            )
        })
    }
    return (
        <div className='Credits'>
            <h4 className='capitalize'>{type}</h4>
            <div className='castingGrid mt-1 flex gap-4 overflow-x-auto'>
                {displayCardArr()}
            </div>
        </div>
    );
};

export default Credits;