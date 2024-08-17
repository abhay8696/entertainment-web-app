import React, { useContext } from 'react';
//context
import { ModalContext } from '../../contexts/AllContexts';
//styles
import "./ModalComp.css";

const ModalComp = () => {

    //contexts
    const [Modal, SetModal] = useContext(ModalContext);
    console.log(Modal)
    
    let { year, category, rating, title, thumbnail, id } = Modal.data;
    let { original_title, overview, popularity, media_type, poster_path, release_date, vote_average, original_name, name } = Modal.data;
    
    release_date ? release_date = release_date.split("-")[0] : null;
    poster_path ? poster_path = `https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}` : null;
    title = title || original_title || name || original_name; 
    return (
        <div 
            className={`ModalComp-wrapper ModalComp-wrapper-${Modal.position} p-4 text-left`} 
            onClick={()=> SetModal({position: "down", data: {}})}
        >
            <h3 className=''>{title}</h3>
            <h6>{`(${release_date})`}</h6>
            <img src={poster_path} className='modalPoster rounded-xl' />
            <p>{overview}</p>
            <p>Rating: {vote_average * 10}%</p>
        </div>
    );
};

export default ModalComp;