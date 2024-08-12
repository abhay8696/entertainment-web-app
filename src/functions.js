import loadInitialDataWith_UUID from "./initialData"
import axios from "axios";


export const transformString = str=> {
    if(!str) return "";
    // Capitalize the first letter of each word
    let capitalizedWords = str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1));
    // Join the capitalized words without spaces
    let transformedString = capitalizedWords.join('');
    // Remove inverted commas (single quotes)
    transformedString = transformedString.replace(/[’':]/g, '');
    return transformedString;
}

//convert space to +
export const string_to_url_string = str =>{
    let newStr = "";

    for(let i = 0; i < str.length; i++){
        if(str[i].charCodeAt(0) === 32) newStr = newStr.concat("+");
        else newStr = newStr.concat(str[i]);
    }

    return newStr;
}

export const localData = (dataName) => {
    //dataName = dummyData / bookmarks
    //get dummyData/bookmarks from local storage
    let data = window.localStorage.getItem(dataName);

    if(data){
      console.log("dummyData/bookmarks found in local storage");
      data = JSON.parse(data);
    }

    else{//if not found save to local
        data = loadInitialDataWith_UUID(); //dummyData not found in local storage, getting from loadInitialDataWith_UUID function
        window.localStorage.setItem(dataName, JSON.stringify(data));
    }

    return data;
}

export const fetchPopular = async (type) => {
    const tmdbKey = "0e791dfd3a5532e30d0ce18c63387296";
    const url = `https://api.themoviedb.org/3/${type}/popular?api_key=${tmdbKey}`;

    const data = await axios.get(url);

    return data ? data.data : undefined;
}

export const fetchByName = async (title, category) => {
    category === "all" ? category = "multi" : null;
    
    const tmdbToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTc5MWRmZDNhNTUzMmUzMGQwY2UxOGM2MzM4NzI5NiIsIm5iZiI6MTcyMzQ1NjI4OC41NTk2NDksInN1YiI6IjY2YjljNTk1MWNmNzA2OTIwMmI3NWZkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J6w5-fCvVFR5PXvHT-Gona7jPfP3leYc3xGRVb4PAF4";
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/search/${category}`,
        params: {query: title, language: 'en-US', page: '1'},
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tmdbToken}`
        }
    };

    try {
        const res = await axios.request(options);
        return res.data.results
    } catch (error) {
        console.log(error)
    }
}