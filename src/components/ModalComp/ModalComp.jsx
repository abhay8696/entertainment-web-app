import React, { useContext, useEffect, useRef, useState } from 'react';
//context
import { ModalContext } from '../../contexts/AllContexts';
//styles
import "./ModalComp.css";
import { fetchByID, fetchDetailsBy_type } from '../../tmdb_functions';
//assets
import closeIcon from "../../assets/close-icon.svg";
//components
import Card from '../Card/Card';
import Casting from '../Casting/Casting';
import Videos from '../Videos/Videos';

const ModalComp = () => {

    //states
    const [moreData, setMoreData] = useState(null);
    const [cast, setCast] = useState(null);
    const [videos, setVideos] = useState(null);
    //contexts
    const [Modal, SetModal] = useContext(ModalContext);
    //refs
    const closeModalButtonAnimation = useRef("");
    
    useEffect(()=> {
        let timeoutId;
        if(Modal?.position === "up") load();
        if(Modal?.position === "down"){
            timeoutId = setTimeout(() => {
                clearData()
            }, 500);
        }

        return () => clearTimeout(timeoutId);
    }, [Modal])
    //functions
    const load = async () => {
        const { id, media_type } = Modal.data;
        const moreDetails = await fetchByID(id, media_type);
        const credits = await fetchDetailsBy_type(id, media_type, "casting");
        const videos = await fetchDetailsBy_type(id, media_type, "videos");

        setMoreData(moreDetails);
        setCast(credits.cast);
        setVideos(videos.results);
        closeModalButtonAnimation.current = "slideInAnime";
    }
    const toggleModal = () => {
        SetModal({...Modal, position: "down"})
    }
    
    const clearData = () => {
        setCast([]);
        closeModalButtonAnimation.current = "slideOutAnime";
    }


    let { year, category, rating, title, thumbnail, id, original_title, overview, popularity, media_type, poster_path, release_date, vote_average, original_name, name } 
    = Modal.data;
    
    release_date ? release_date = release_date.split("-")[0] : null;
    poster_path ? poster_path = `https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}` : null;
    title = title || original_title || name || original_name; 
    
    //sub-components
    const MoreData = () => {
        if(!moreData) return null;
        
        let { adult, backdrop_path, belongs_to_collection, budget, genres, homepage, imdb_id, origin_country, original_language, production_companies, production_countries, revenue, runtime, spoken_languages, status, tagline, video, vote_count, release_date } 
        = moreData;

        return(
            <ul className='moreData_in_modal text-sm'>
                <li>
                    <span className='font-bold'>Release</span>: <span>{release_date}</span>
                </li>
                <li>
                    <span className='font-bold'>Website</span>: <a href={homepage} target='_blank' className='underline'>{homepage}</a>
                </li>
                <li>
                    <span className='font-bold'>Production</span>: <span>{production_companies[0].name}</span>
                </li>
                <li>
                    <span className='font-bold'>Budget</span>: <span>&{budget}</span>
                </li>
                <li>
                    <span className='font-bold'>Revenue</span>: <span>&{revenue}</span>
                </li>
                <li>
                    <span className='font-bold'>Runtime</span>: <span>{runtime}</span>
                </li>
            </ul>
        )
    }

    return (
        <div 
            className={`ModalComp-wrapper ModalComp-wrapper-${Modal.position}`} 
            
        >   
            <span 
                onClick={toggleModal} 
                className={`${closeModalButtonAnimation.current} backIcon w-[35px] h-[100px] py-1 top-[30vh] md:top-[45vh] fixed flex items-center justify-center cursor-pointer `}
            >
                <img 
                    src={closeIcon} 
                    alt="close button" 
                    className="w-[50px] aspect-[16/9]"
                />
            </span>
            <div 
                className='Modal p-4 lg:px-9 text-left flex flex-col gap-2'
                
            >
                <div className='flex justify-center align-center modalPoster-small-wrapper'>
                    <img src={poster_path} className='align-self-center modalPoster rounded-xl modalPoster-small' />
                </div>
                <div className='modalHead py-2 md:py-4 flex gap-4 items-center md:rounded-xl'>
                    <img src={poster_path} className='modalPoster rounded-xl modalPoster-big' />
                    <div className='flex-1'>
                        <h3 className='modalTitle md:text-5xl lg:text-8xl' onClick={()=> console.log(moreData)}> {title} </h3>
                        <p className='modalTagline  md:text-2xl lg:text-2xl text-italic'>{moreData?.tagline}</p>
                        <p className='modalOverview hidden md:block max-w-[750px] mt-4'>{overview}</p>
                    </div>
                </div>
                
                <p className='modalOverview md:hidden'>{overview}</p>
                {
                    cast ? <Casting cast = {cast} /> : null
                }
                {
                    videos ? <Videos videos={videos}/> : null
                }
            </div>
        </div>
    );
};

export default ModalComp;