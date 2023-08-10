// Immediately export a function that generates a string of random numbers and letters. Taken from coding boot camp week 11.
module.exports = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
