import React, { useEffect, useRef, useState } from 'react';
//styles
import "./MiniModal.css";
import { fetchByID } from '../../tmdb_functions';
//assets
import closeIcon from "../../assets/close-icon.svg";
//components
import ImagesGrid from '../ImagesGrid/ImagesGrid';

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
    const [personImages, setPersonImages] = useState();
    
    //refs
    const closeModalButtonAnimation = useRef("");

    //when popup appears
    useEffect(()=> {
        if(popUpStatus === "popUp-appear"){
            if(parentComp === "cast" || parentComp === "crew"){
                getPersonData();
                getPersonImages()
            }
            closeModalButtonAnimation.current = "slideInAnime";

        }
    }, [popUpStatus]);

    //functions
    const handleClick = event => {
        event.stopPropagation();
        closePopUp();
        closeModalButtonAnimation.current = "slideOutAnime";
    }
    const getPersonData = async () => {
        const fetchPersonData = await fetchByID(allData.id, "person");
        setPersonData(fetchPersonData);
    }
    const getPersonImages = async () => {
        const images = await fetchByID(allData.id, "person", "images");
        if(!images) return;
        setPersonImages(images.profiles);
    }

    const DisplayPersonInfo = ({personData}) => {
        if(!personData) return null;

        let { adult, also_known_as, biography, birthday, deathday, gender, homepage, id, imdb_id, known_for_department, name, place_of_birth, popularity, profile_path }
        = personData;        

        profile_path ? profile_path = `https://image.tmdb.org/t/p/w220_and_h330_face${profile_path}` : null;

        return(
            <div className=''>
                <div className='popUpHead rounded-xl'>
                    <img 
                        src={profile_path} 
                        alt={name} 
                        className='w-[200px] md:w-[250px] lg:w-[300px]'
                    />
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
        <div className={`popUpWrapper ${popUpStatus} overflow-x-auto`} >
            <span 
                onClick={handleClick} 
                className={`${closeModalButtonAnimation.current} backIcon w-[75px] py-1.5 fixed top-0 left-0 md:left-[2rem] lg:left-0 lg:top-[2rem] flex items-center justify-center cursor-pointer `}
            >
                <img 
                    src={closeIcon} 
                    alt="close button" 
                    className="w-[50px] aspect-[16/9]"
                />
            </span>
            {displayVideoPopUp()}
            <DisplayPersonInfo personData={personData} />
            <ImagesGrid images={personImages}/>
        </div>
    );
};

export default MiniModal;
