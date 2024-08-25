import React from 'react';


const ImagesGrid = ({images})=> {
    if(!images) return null;

    const tmdbImgUrl = `https://image.tmdb.org/t/p/w220_and_h330_face`
    const arr = images.map(item => {
        return (
            <img  
                className=''
                src={`${tmdbImgUrl}${item.file_path}`} 
                alt={`image collection`}
                loading='lazy'
            />
        )
    })

    return(
        <div className='imagesGrid-wrapper'>
            <h4 className='capitalize'>images</h4>
            <div className='imagesGrid grid grid-cols-3 mt-1 md:grid-cols-5 lg:grid-cols-8 justify-between gap-4'>
                {arr}
            </div>
        </div>
    )
}

export default ImagesGrid;