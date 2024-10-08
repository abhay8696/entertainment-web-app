import React from 'react';
//styles
import "./VideosRow.css";
//components
import MiniCard from '../MiniCard/MiniCard';
import { trim_string } from '../../functions';

const VideosRow = props => {
    const { videos } = props;

    //functions
    const displayVideoCards = () => {
        return videos.map(vid => {
            const { id, name, original_name, key:youtubeKey, official, site } = vid;
            
            return(
                <MiniCard 
                    name = {trim_string(`${name || original_name}`, 35)}
                    youtubeKey = {youtubeKey}
                    allData = {vid}
                    key = {`videoCard-${id}`}
                    site = {site}
                    parentComp = "VideosRow"
                />
            )
        })
    }
    return (
        <div className='VideosRow'>
            <h4>Videos</h4>
            <div className='videosGrid mt-1 flex gap-4 overflow-x-auto'>
                {displayVideoCards()}
            </div>
        </div>
    );
};

export default VideosRow;