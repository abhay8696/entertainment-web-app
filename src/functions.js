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