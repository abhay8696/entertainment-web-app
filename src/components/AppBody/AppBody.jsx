import React, { useEffect, useState } from 'react';
//librabries
import axios from 'axios';
//styles
import "./AppBody.css";
//components
import SearchComp from '../SearchComp/SearchComp';
import Trending from '../Trending/Trending';
import Recommendations from '../Recommendations/Recommendations';
import initialData from "../../data.json";
//functions
import { string_to_url_string } from '../../functions';
import SearchResult from '../SearchResult/SearchResult';
//variables
const omdbKey = "b76a9ec3"
const omdbUrl = `http://www.omdbapi.com/?apikey=${omdbKey}&page=2`;


const AppBody = props => {
    const { searchedItem, closeSearch, handleSearchItem, dummyData } = props;
    //life cycle - on App load
    //functions
    const getOMDB = async ({title, year, type}) => {
        let url = `${omdbUrl}`;
        
        if(title){
            title = string_to_url_string(title);
            url = url.concat("&", `t=${title}`);
        }
        if(year) url = url.concat("&", `y=${year}`);
        if(type) {
            if(type = "TV Series") type = "series"
            url = url.concat("&", `type=${type}`);
        }

        try{
            console.log({title, year, type, url});
            const response = await axios.get(url);
            
            if(response?.data?.Response === "True"){
                handleSearchItem({
                    found: true,
                    data: {...response?.data}
                })
            }else{
                handleSearchItem({
                    found: false,
                    data: {...response?.data},
                    message: "This app uses third party API called OMDB, make sure searched term is correct."
                })
            }
        }catch(err){
            handleSearchItem({
                found: false,
                data: {...response?.data},
                message: err
            })
        }
    }

    return (
        <div className='AppBody text-start flex flex-col gap-6 md:gap-8 pt-14 lg:pt-0 lg:pl-24 my-6 md:my-8'>
            <div className='px-4 md:px-0 lg:px-9'>
                <SearchComp getOMDB={getOMDB} handleSearchItem={handleSearchItem}/>
            </div>
            {
                searchedItem.found 
                ?
                    <div className='trendingDiv flex flex-col gap-4 px-4 md:px-0 lg:px-9'>
                        <SearchResult data={searchedItem?.data}/>
                    </div>
                :
                <>
                    <div className='trendingDiv flex flex-col gap-4 px-4 md:px-0 lg:px-9'>
                        {dummyData ? <Trending dummyData={dummyData} getOMDB={getOMDB}/> : null}
                    </div>
                    <div className='recommendationDiv flex flex-col gap-4 px-4 md:px-0 lg:px-9'>
                        {dummyData ? <Recommendations dummyData={dummyData}/> : null}
                    </div>
                </>
            }
        </div>
    );
};

export default AppBody;