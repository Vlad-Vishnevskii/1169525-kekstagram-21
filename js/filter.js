'use strict';

(function () {
  const imgFilters = document.querySelector(`.img-filters`);
  const filterRandom = document.querySelector(`#filter-random`);
  const filterDefault = document.querySelector(`#filter-default`);
  const MAX_UNIQUE_PHOTOS = 10;
  const filterDiscussed = document.querySelector(`#filter-discussed`);
  const pictureForDell = document.getElementsByClassName(`picture`);

  imgFilters.classList.remove(`img-filters--inactive`);

  const onFilterRandom = function (data) {
    filterRandom.addEventListener(`click`, function () {
      const newArray = window.util.getRandomUniqueElement(data, MAX_UNIQUE_PHOTOS);
      window.picture.delElements(pictureForDell);
      window.util.debounce(window.picture.render(newArray));
    });
  };

  const onFilterDefault = function (data) {
    filterDefault.addEventListener(`click`, function () {
      window.picture.delElements(pictureForDell);
      window.util.debounce(window.picture.render(data));
    });
  };

  const onFilterDiscussed = function (data) {
    filterDiscussed.addEventListener(`click`, function () {
      const newArray = window.util.getDiscussedPhoto(data);
      window.picture.delElements(pictureForDell);
      window.util.debounce(window.picture.render(newArray));
    });
  };

  window.filter = {
    onFilterRandom: onFilterRandom,
    onFilterDefault: onFilterDefault,
    onFilterDiscussed: onFilterDiscussed
  };
})();
