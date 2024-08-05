export const transformString = str=> {
    // Capitalize the first letter of each word
    let capitalizedWords = str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1));
    // Join the capitalized words without spaces
    let transformedString = capitalizedWords.join('');
    // Remove inverted commas (single quotes)
    transformedString = transformedString.replace(/[’':]/g, '');
    return transformedString;
}