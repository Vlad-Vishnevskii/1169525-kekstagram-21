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
    arr.sort(function (a, b) {
      if (a.comments.length > b.comments.length) {
        return 1;
      }
      if (a.comments.length < b.comments.length) {
        return -1;
      }
      return 0;
    });
  };

  window.util = {
    getRandomInt: getRandomInt,
    getRandomUniqueElement: getRandomUniqueElement,
    getDiscussedPhoto: getDiscussedPhoto
  };
})();
