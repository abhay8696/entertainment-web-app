import loadInitialDataWith_UUID from "./initialData"


export const transformString = str=> {
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
