import React from 'react';
//styles
import "./MiniCard.css";
import { trim_string } from '../../functions';

const MiniCard = props => {
    const { name, original_name, profile_path, characterName, allData, youtubeKey, site } = props;

    //sub-components
    const ProfilePicture = () => {
        if(profile_path){
            return(
                <div
                    className='w-[120px] md:w-[175px] aspect-[1] rounded-xl bg-center bg-cover'
                    style={{
                        backgroundImage: profile_path ? `url(https://image.tmdb.org/t/p/w220_and_h330_face${profile_path})` : `url(${dummyImg})`
                    }}
                ></div>
            )
        }
    }
    const YouTubeEmbed = ({ youtubeKey, title }) => {
        if(!site) return null;
        if(site !== "YouTube") return null;

        const videoUrl = `https://www.youtube.com/embed/${youtubeKey}`;
        
        return (
          <div className="bg-red border-1">
            <iframe
              src={videoUrl}
              allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title= {title}
              className='w-[200px] md:w-[300px] lg:w-[350px] aspect-[560/315] rounded-xl'
            />
          </div>
        );
      };
      const Character_Name = ({name}) => {
        if(!name) return null;

        return(
            <span className='text-xs'>
                <span className=''>{"as "}</span> 
                <span className='text-white'>
                    {name}
                </span>
            </span>
        )
      }
    return (
        <div className='MiniCard CastCard'>
            {/* <img src={`https://image.tmdb.org/t/p/w220_and_h330_face${profile_path} max-w-[200px] `}/> */}
            <ProfilePicture />
            <YouTubeEmbed youtubeKey={youtubeKey} title={name}/>
            <div className='castCardTexts flex flex-col mt-1'>
                <span className='text-white text-sm'>
                    {name || original_name}
                </span>
                <Character_Name name={characterName} />
            </div>
        </div>
    )
}

export default MiniCard;