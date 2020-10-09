'use strict';

(function () {
  const getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };
  window.util = {
    getRandomInt: getRandomInt
  };
})();
