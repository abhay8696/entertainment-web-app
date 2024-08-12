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
import { fetchByName, string_to_url_string } from '../../functions';
import SearchResult from '../SearchResult/SearchResult';
//variables
const omdbKey = "b76a9ec3"
const omdbUrl = `http://www.omdbapi.com/?apikey=${omdbKey}&page=2`;


const AppBody = props => {
    const { searchedItem, closeSearch, handleSearchItem, dummyData, categoreyName, handleBookMarks, bookmarkMap, handleCategoreyName } = props;
    //life cycle - on App load
    //functions
    const getTMDB = async (title) => {
        const data = await fetchByName(title, categoreyName);
        handleSearchItem(data);
    }
    return (
        <div className='AppBody text-start flex flex-col gap-6 md:gap-8 pt-14 lg:pt-0 lg:pl-24 my-6 md:my-8'>
            <div className='px-4 md:px-0 lg:px-9'>
                <SearchComp 
                    handleSearchItem={handleSearchItem}
                    handleCategoreyName={handleCategoreyName}
                    getTMDB={getTMDB}
                    categoreyName={categoreyName}
                    searchedItem={searchedItem}
                />
            </div>
            {
                searchedItem
                ?
                    <div className='trendingDiv flex flex-col gap-4 px-4 md:px-0 lg:px-9'>
                        <SearchResult 
                            bookmarkMap={bookmarkMap}
                            handleBookMarks={handleBookMarks} 
                            data={searchedItem}
                            categoreyName={categoreyName}
                        />
                    </div>
                :
                <>
                    <div className='trendingDiv flex flex-col gap-4 px-4 md:px-0 lg:px-9'>
                        {
                        dummyData && categoreyName !== "bookmark"
                        ? 
                        <Trending 
                            bookmarkMap={bookmarkMap}
                            handleBookMarks={handleBookMarks} 
                            categoreyName={categoreyName} 
                            dummyData={dummyData} 
                        /> 
                            
                        : 
                        null}
                    </div>
                    <div className='recommendationDiv flex flex-col gap-4 px-4 md:px-0 lg:px-9'>
                        {
                        dummyData 
                        ? 
                        <Recommendations 
                            bookmarkMap={bookmarkMap}
                            handleBookMarks={handleBookMarks} 
                            categoreyName={categoreyName} 
                            dummyData={dummyData}
                        /> 
                        : 
                        null}
                    </div>
                </>
            }
        </div>
    );
};

export default AppBody;