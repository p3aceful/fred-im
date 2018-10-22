export function groupBy(array, key) {
    return array.reduce((prev, curr) => {
        if (!prev.length) {
            prev.push([curr]);
            return prev;
        }
        else {
            const topArr = prev.pop();
            const top = topArr[topArr.length - 1];

            if (top[key] === curr[key]) {
                topArr.push(curr);
                prev.push(topArr);
                return prev;
            }
            else {
                prev.push(topArr);
                prev.push([curr]);
                return prev;
            }
        }
    }, []);
}

/**
 * Dose not work for objects that contains functions.
 * @param {*} obj 
 */
export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function formatDate(date) {
    //format date based on time elapsed
    // if date is more than 24 hours old, return date month year
    // else return time of day it was written.
    const before = new Date(date);
    const now = new Date();
    const diff = now - before;
    const hrs = ((diff / 1000) / 60) / 60;
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    if (hrs > 24) {
        return `${days[before.getDay()]}. ${before.getDate()}.${before.getMonth()}.${before.getFullYear()} - ${before.getHours()}:${before.getMinutes()}:${before.getSeconds()}`
    }
    else {
        return `${before.getHours()}:${before.getMinutes()}`
    }
}