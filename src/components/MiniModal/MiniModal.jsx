import React, { useEffect, useState } from 'react';
//styles
import "./MiniModal.css";
import { fetchByID } from '../../tmdb_functions';

const YouTubeEmbed = ({ youtubeKey, title }) => {
    if(!youtubeKey || !title) return null;

    const videoUrl = `https://www.youtube.com/embed/${youtubeKey}`;
    
    return (
      <div className="bg-red border-1">
        <iframe
          src={videoUrl}
          allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title= {title}
          className='w-[90vw] md:w-[75vw] lg:w-[50vw] aspect-[560/315] rounded-xl'
        />
      </div>
    );
  };

const MiniModal = props => {
    const { popUpStatus, closePopUp, parentComp, allData } = props;

    //states
    const [personData, setPersonData] = useState();

    //when popup appears
    useEffect(()=> {
        if(popUpStatus === "popUp-appear"){
            if(parentComp === "cast" || parentComp === "crew") getPersonData();

        }
    }, [popUpStatus]);

    //functions
    const handleClick = event => {
        event.stopPropagation();
        closePopUp();
    }
    const getPersonData = async () => {
        const fetchPersonData = await fetchByID(allData.id, "person");
        setPersonData(fetchPersonData);
    }

    const DisplayPersonInfo = ({personData}) => {
        if(!personData) return null;

        let { adult, also_known_as, biography, birthday, deathday, gender, homepage, id, imdb_id, known_for_department, name, place_of_birth, popularity, profile_path }
        = personData;        

        profile_path ? profile_path = `https://image.tmdb.org/t/p/w220_and_h330_face${profile_path}` : null;

        return(
            <div className='PersonPopUp'>
                <div className='popUpHead rounded-xl'>
                    <img src={profile_path} alt={name} />
                    <h3>{name}</h3>
                </div>
                <div className='popUpBody'>
                    <div>
                    <p className='max-w-[1000px]'>{biography}</p>
                    </div>
                </div>
            </div>
        )

    }

    const displayVideoPopUp = () => {
        if(popUpStatus !== "popUp-appear") return null;
        if(!allData || !allData.key) return;
        return(
            <div className={`VideoPopUp h-[100%] flex items-center justify-center`} >
                <YouTubeEmbed youtubeKey = {allData?.key} title = {allData?.name} />
            </div>
        )
    }


    return (
        <div className={`popUpWrapper ${popUpStatus}`} onClick={handleClick}>
            {displayVideoPopUp()}
            <DisplayPersonInfo personData={personData} />
        </div>
    );
};

export default MiniModal;
