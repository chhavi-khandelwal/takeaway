/**
 * Debounce a function by specified time limit
 * @param callback Function to debounce
 * @param limit Time limit (in ms)
 * @returns {Function}
 */
export const debounce = (callback, limit) => {
  var wait = false, timer;
  return function () {
      if(wait) {
          clearTimeout(timer);
          timer = null;
      }
      timer = setTimeout(function () {
          callback.call();
      }, limit);
      wait = true;
  };
};

/**
 * get array of ratings to plot stars
 * @param {points} number = rating
 * returns array
*/
export const getRating = points => {
    let stars = [], gold = true;
    if (!points) {
        return stars;
    }
    const maxRating = 5;
    for (let i = 1; i <= maxRating; i++) {
        gold ? (i <= points ? stars.push(1) : stars.push(i - points)) :  stars.push(0);
        if (points - i <= 0) { gold = false; }
    }
    return stars;
}
  
