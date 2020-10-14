'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500;

  const getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const getRandomUniqueElement = function (arr, maxCount) {
    const newArr = [];
    let randomNumber;

    while (newArr.length < maxCount) {
      randomNumber = Math.floor(Math.random() * maxCount);
      if (newArr.indexOf(arr[randomNumber]) === -1) {
        newArr.push(arr[randomNumber]);
      }
    }
    return newArr;
  };

  const getDiscussedPhoto = function (arr) {
    const newArr = arr.slice();
    newArr.sort(function (a, b) {
      if (a.comments > b.comments) {
        return -1;
      }
      if (a.comments < b.comments) {
        return 1;
      }
      return 0;
    });
    return newArr;
  };

  const debounce = function (cb) {
    const lastTimeout = null;

    return function () {
      const parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    getRandomInt: getRandomInt,
    getRandomUniqueElement: getRandomUniqueElement,
    getDiscussedPhoto: getDiscussedPhoto,
    debounce: debounce
  };
})();
