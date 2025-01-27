
/**
 * Returns a shortened version of the array (first 3 items) or the entire array 
 * based on the specified wrapper condition.
 * 
 * @param {Array} array - The array of data to slice.
 * @param {string} wrapper - The condition to determine if the array should be shortened or not.
 * @returns {Array} - The first 3 items of the array if the wrapper is "short", else the entire array.
 */
export function getCardForShort(array, wrapper){
    if(wrapper === "short"){
        // If the wrapper is "short", return only the first 3 elements of the array
        return array.slice(0,3);
    }else{
        // Otherwise, return the entire array
        return array;
    }
}

/**
 * Shortens the provided text to the specified length and appends "..." if the text exceeds the length.
 * 
 * @param {string} text - The text to shorten.
 * @param {number} length - The length at which to truncate the text.
 * @returns {string} - The shortened text with "..." appended if truncated.
 */
export function getSliceText(text, length){
    // If the text length is greater than the specified length, truncate and add ellipsis
    return text.length > length ? text.slice(0,length) + "..." : text;
}

/**
 * Compares two dates to check if the second date (`to`) is later than the first date (`from`).
 * 
 * @param {string|Date} from - The first date to compare.
 * @param {string|Date} to - The second date to compare.
 * @returns {boolean} - Returns true if `to` is later than `from`, false otherwise.
 */
export function isGreaterDate(from, to){
    const fromDate = new Date(from); // Convert the "from" date to a Date object
    const toDate = new Date(to); // Convert the "to" date to a Date object

    // Compare the years, months, and days in the dates to check if the "to" date is later
    if(toDate.getFullYear() > fromDate.getFullYear()){
        return true;
    }else if(toDate.getMonth() > fromDate.getMonth()){
        return true;
    }else if(toDate.getDate() > fromDate.getDate()){
        return true;
    }else{
        return false; // If none of the above conditions are true, the "to" date is not greater
    }
}

/**
 * Compares two dates to check if they are the same day (same year, month, and date).
 * 
 * @param {string|Date} d1 - The first date to compare.
 * @param {string|Date} d2 - The second date to compare.
 * @returns {boolean} - Returns true if both dates are on the same day, false otherwise.
 */
export function isEqualDate(d1, d2){

    const date1 = new Date(d1); // Convert the first date to a Date object
    const date2 = new Date(d2); // Convert the second date to a Date object

    // Check if the year, month, and day of both dates are equal
    const year = date2.getFullYear() === date1.getFullYear();
    const month = date2.getMonth() === date1.getMonth();
    const day = date2.getDate() === date1.getDate();

    // Return true if all parts of the date are equal
    return year && month && day; 
}

/**
 * Calculates the difference between the provided date and the current date,
 * and returns a human-readable string indicating how much time has passed.
 * 
 * @param {string|Date} date - The date to compare with the current date.
 * @returns {string} - A string representing the time difference (e.g., "2 days", "5 hours", "Now").
 */
export function setTime(date){

    const currentTime = new Date(); // Get the current date and time
    const time = new Date(date); // Convert the input date to a Date object
    let timeDiff = "";  // Variable to store the resulting time difference

    // Compare the current time with the provided time to calculate the difference
    if(currentTime.getFullYear() > time.getFullYear()){
        const yearDiff = currentTime.getFullYear() - time.getFullYear() 
        timeDiff = `${yearDiff} year${yearDiff > 1 ? 's' : ''}`
    }else if(currentTime.getMonth() > time.getMonth()){
        const monthDiff = (currentTime.getMonth() - time.getMonth()) + 1;
        timeDiff = `${monthDiff} mon${monthDiff > 1 ? 's' : ''}`
    }else if(currentTime.getDate() > time.getDate()){
        const dayDiff = currentTime.getDate() - time.getDate() 
        timeDiff = `${dayDiff} day${dayDiff > 1 ? 's' : ''}`
    }else if(currentTime.getHours() > time.getHours()){
        const hourDiff = currentTime.getHours() - time.getHours() 
        timeDiff = `${hourDiff} hr${hourDiff > 1 ? 's' : ''}`
    }else if(currentTime.getMinutes() > time.getMinutes()){
        const minDiff = currentTime.getMinutes() - time.getMinutes() 
        timeDiff = `${minDiff} min${minDiff > 1 ? 's' : ''}`
    }else if(currentTime.getSeconds() > time.getSeconds()){
        const secDiff = currentTime.getSeconds() - time.getSeconds() 
        timeDiff = `${secDiff} sec${secDiff > 1 ? 's' : ''}`
    }else{
        timeDiff = "Just Now";
    }

    return timeDiff; // Return the formatted time difference

}