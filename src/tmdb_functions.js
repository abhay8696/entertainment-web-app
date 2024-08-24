import axios from "axios";
const tmdbToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTc5MWRmZDNhNTUzMmUzMGQwY2UxOGM2MzM4NzI5NiIsIm5iZiI6MTcyMzQ1NjI4OC41NTk2NDksInN1YiI6IjY2YjljNTk1MWNmNzA2OTIwMmI3NWZkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J6w5-fCvVFR5PXvHT-Gona7jPfP3leYc3xGRVb4PAF4";

export const fetchByID = async (id, category, extraParameter) => {
    /**
     * id => tmdb id
     * category => movies/tv
     * extraParameter => images/videos
     */
    
    let key_for_local_storage = `${category}-${id}`

    let url = `https://api.themoviedb.org/3/${category}/${id}`;

    if(extraParameter){
        url = url.concat(`/${extraParameter}`);
        key_for_local_storage = key_for_local_storage.concat(`-${extraParameter}`);
    }

    //get from local
    const details = localStorage.getItem(key_for_local_storage);

    if(details) return JSON.parse(details);


    //if not found get from api
    const options = {
        method: 'GET',
        url,
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
        localStorage.setItem(key_for_local_storage, JSON.stringify(res.data));
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

export const fetchDetailsBy_type = async (id, category, type) => {
    //get from local
    const details = localStorage.getItem(`type-${category}-${id}`);
    if(details) return JSON.parse(details);

    //if not found get from api

    if(type === "casting") type = "credits";

    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/${category}/${id}/${type}?language=en-US`,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTc5MWRmZDNhNTUzMmUzMGQwY2UxOGM2MzM4NzI5NiIsIm5iZiI6MTcyMzkwNjU4Ny42NDY4NzYsInN1YiI6IjY2YjljNTk1MWNmNzA2OTIwMmI3NWZkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qy_CGEc1GSrg0MRHMj7PJuXbUjj5enwZ5CgHBNVZ_dc'
        }
      };

    try {
        const res = await axios.request(options);
        localStorage.setItem(`${type}-${category}-${id}`, JSON.stringify(res.data));
        
        return res.data
    } catch (error) {
        console.log(error)
    }
}