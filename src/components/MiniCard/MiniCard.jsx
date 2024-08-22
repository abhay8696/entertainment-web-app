import React from 'react';
//styles
import "./MiniCard.css";
//assets
import youtubeIcon from "../../assets/icon-youtube.svg";

const dummyImg = "https://imgs.search.brave.com/QrrF8yctvnxGKn5UBvuEt1XL7Pv04zXmzQ0y50RN5cY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzkxLzIyLzU5/LzM2MF9GXzc5MTIy/NTkyN19jYVJQUEg5/OUQ2RDFpRm9ua0NS/bUNHemtKUGYzNlFE/dy5qcGc";


const MiniCard = props => {
    const { parentComp, name, original_name, profile_path, characterName, role, allData, youtubeKey, site } = props;

    //sub-components
    const MiniCardImage = () => {
        let aspect = "1", backgroundImage = "", flexStr = "flex justify-center items-center"
        let img = <img src={youtubeIcon} alt="youtube icon" className='w-[100px]'/>

        if(parentComp === "Videos") aspect = "16/9";

        if(parentComp === "cast" || parentComp === "crew"){
            backgroundImage = profile_path ? `url(https://image.tmdb.org/t/p/w220_and_h330_face${profile_path})` : `url(${dummyImg})`
            img = null;
        }

        return(
            <div
                className={`cursor-pointer h-[120px] md:h-[175px] rounded-xl bg-center bg-cover bg-semi-dark-blue ${flexStr}`}
                style={{
                    backgroundImage: backgroundImage,
                    aspectRatio: `${aspect}`
                }}
            >
                {img}
            </div>
        )
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
      const youtubeImg = ()=> {
        return (
            <div>
                
            </div>
        )
      }
      const Character_Name = ({name}) => {
        if(!name) return null;

        return(
            <span className='text-xs'>
                <span className=''>
                    {parentComp === "cast" ? "as " : "dept. "}
                </span> 
                <span className='text-white'>
                    {name}
                </span>
            </span>
        )
      }
    return (
        <div className='MiniCard CreditsCard'>
            {/* <img src={`https://image.tmdb.org/t/p/w220_and_h330_face${profile_path} max-w-[200px] `}/> */}
            <MiniCardImage />
            {/* <YouTubeEmbed youtubeKey={youtubeKey} title={name}/> */}
            <div className='castCardTexts flex flex-col mt-1'>
                <span className='text-white text-sm'>
                    {name || original_name}
                </span>
                <Character_Name name={characterName || role} />
            </div>
        </div>
    )
}

export default MiniCard;