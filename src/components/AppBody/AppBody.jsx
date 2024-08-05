import React, { useEffect, useState } from 'react';
//styles
import "./AppBody.css";
//components
import SearchComp from '../SearchComp/SearchComp';
import Trending from '../Trending/Trending';
import Recommendations from '../Recommendations/Recommendations';
//data
import initialData from "../../data.json";

const AppBody = () => {
    //states
    // const [dummyData, setDummyData] = useState(initialData)
    //life cycle - on App load
    useEffect(()=> {
        // loadData();
    }, []);

    //functions
    const loadData = () => {
        // console.log(initialData)
    }

    return (
        <div className='AppBody text-start flex flex-col gap-6 md:gap-8 pt-14 lg:pt-0 lg:pl-24 my-6 md:my-8'>
            <div className='px-4 md:px-0 lg:px-9'>
                <SearchComp />
            </div>
            <div className='trendingDiv flex flex-col gap-4 px-4 md:px-0 lg:px-9'>
                <Trending initialData={initialData}/>
            </div>
            <div className='recommendationDiv flex flex-col gap-4 px-4 md:px-0 lg:px-9'>
                <Recommendations initialData={initialData}/>
            </div>
        </div>
    );
};

export default AppBody;