import axios from "axios";
const tmdbToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTc5MWRmZDNhNTUzMmUzMGQwY2UxOGM2MzM4NzI5NiIsIm5iZiI6MTcyMzQ1NjI4OC41NTk2NDksInN1YiI6IjY2YjljNTk1MWNmNzA2OTIwMmI3NWZkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J6w5-fCvVFR5PXvHT-Gona7jPfP3leYc3xGRVb4PAF4";

export const fetchByID = async (id, category) => {
    //get from local
    const details = localStorage.getItem(`${category}-${id}`);
    if(details) return JSON.parse(details);

    //if not found get from api
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/${category}/${id}?language=en-US`,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tmdbToken}`
        }
    };

    
    try {
        const res = await axios.request(options);
        // console.log(res.data)
        //save to localstorage
        console.log(`${category} fetching from API and saving to local`)
        localStorage.setItem(`${category}-${id}`, JSON.stringify(res.data));
        return res.data
    } catch (error) {
        console.log(error)
    }
}


export const fetchTrending = async (type) => {
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/trending/${type}/day?language=en-US&page=1`,
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

export const fetchTopRated = async type => {
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/${type}/top_rated?language=en-US&page=1`,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tmdbToken}`
        }
      };

    try {
        const res = await axios.request(options);
        // console.log(res.data.results)
        return res.data.results;
    } catch (error) {
        console.log(error)
    }
}

export const fetchByName = async (title, category) => {
    // category === "all" || category === "bookmark" ? category = "multi" : null;
    
    const options = {
        method: 'GET',
        // url: `https://api.themoviedb.org/3/search/${category}`,
        url: `https://api.themoviedb.org/3/search/multi`,
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

export const fetchCreditsById = async (id, category) => {
    //get from local
    const details = localStorage.getItem(`casting-${category}-${id}`);
    if(details) return JSON.parse(details);

    //if not found get from api

    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/${category}/${id}/credits?language=en-US`,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTc5MWRmZDNhNTUzMmUzMGQwY2UxOGM2MzM4NzI5NiIsIm5iZiI6MTcyMzkwNjU4Ny42NDY4NzYsInN1YiI6IjY2YjljNTk1MWNmNzA2OTIwMmI3NWZkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qy_CGEc1GSrg0MRHMj7PJuXbUjj5enwZ5CgHBNVZ_dc'
        }
      };

    try {
        const res = await axios.request(options);
        localStorage.setItem(`casting-${category}-${id}`, JSON.stringify(res.data));
        
        return res.data
    } catch (error) {
        console.log(error)
    }
}