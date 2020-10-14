'use strict';

(function () {
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

  window.util = {
    getRandomInt: getRandomInt,
    getRandomUniqueElement: getRandomUniqueElement,
    getDiscussedPhoto: getDiscussedPhoto
  };
})();
