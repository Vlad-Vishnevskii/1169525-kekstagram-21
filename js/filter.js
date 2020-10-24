'use strict';

(function () {
  const MAX_UNIQUE_PHOTOS = 10;

  const getDiscussedPhoto = function (data) {
    return data.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  const filterRandom = function (data) {
    return data.sort(function () {
      return window.util.getRandomInt(-1, 1);
    }).slice(0, MAX_UNIQUE_PHOTOS);
  };

  const filterData = function (data, filter) {
    const copyData = data.slice();
    switch (filter.id) {
      case `filter-default`:
        return copyData;
      case `filter-random`:
        return filterRandom(copyData);
      case `filter-discussed`:
        return getDiscussedPhoto(copyData);
    }
    return copyData;
  };

  window.filter = filterData;
})();
