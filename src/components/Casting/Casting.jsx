import React from 'react';
//styles
import "./Casting.css";

const dummyImg = "https://imgs.search.brave.com/QrrF8yctvnxGKn5UBvuEt1XL7Pv04zXmzQ0y50RN5cY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzkxLzIyLzU5/LzM2MF9GXzc5MTIy/NTkyN19jYVJQUEg5/OUQ2RDFpRm9ua0NS/bUNHemtKUGYzNlFE/dy5qcGc";

const Casting = props => {
    const { cast } = props;
    //functions
    const displayCardArr = () => {
        return cast.map(actor => {
            const { adult, gender, id, known_for_department, name, original_name, popularity, profile_path, cast_id, character, credit_id, order }
            = actor;
            return(
                <CastCard 
                    name = {name || original_name}
                    profile_path = {profile_path}
                    characterName = {character}
                    allData = {actor}
                    key = {`castCard-${id}`}
                />
            )
        })
    }
    //subComponents
    const CastCard = ({name, original_name, profile_path, characterName, allData}) => {
        return (
            <div className='CastCard'>
                {/* <img src={`https://image.tmdb.org/t/p/w220_and_h330_face${profile_path} max-w-[200px] `}/> */}
                <div
                    className='w-[120px] md:w-[175px] aspect-[1] rounded-xl bg-center bg-cover'
                    style={{
                        backgroundImage: profile_path ? `url(https://image.tmdb.org/t/p/w220_and_h330_face${profile_path})` : `url(${dummyImg})`
                    }}
                ></div>
                <div className='castCardTexts flex flex-col mt-1'>
                    <span className='text-white text-sm'>{name || original_name}</span>
                    <span className='text-xs'>
                        <span className=''>as</span> 
                        <span className='text-white'>{` ${characterName}`}</span>
                    </span>
                </div>
            </div>
        )
    }
    return (
        <div className='Casting' onClick={()=>console.log(cast)}>
            <h4>Cast</h4>
            <div className='castingGrid mt-1 flex gap-4 overflow-x-auto'>
                {displayCardArr()}
            </div>
        </div>
    );
};

export default Casting;