'use strict';

(function () {
  const imgFilters = document.querySelector(`.img-filters`);
  const filterRandom = document.querySelector(`#filter-random`);
  const filterDefault = document.querySelector(`#filter-default`);
  const MAX_UNIQUE_PHOTOS = 10;
  const filterDiscussed = document.querySelector(`#filter-discussed`);
  const pictureForDell = document.getElementsByClassName(`picture`);
  const imgFiltersForm = document.querySelector(`.img-filters__form`);

  imgFilters.classList.remove(`img-filters--inactive`);

  const getDiscussedPhoto = function (data) {
    return data.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  const onImgFiltersForm = function (data) {
    imgFiltersForm.addEventListener(`click`, function (evt) {
      switch (evt.target) {
        case filterDiscussed:
          const newArrayDiscussed = getDiscussedPhoto(data.slice());
          window.picture.delElements(pictureForDell);
          window.util.debounce(window.picture.render(newArrayDiscussed));
          break;
        case filterRandom:
          const newArrayRandom = data.slice(0, MAX_UNIQUE_PHOTOS).sort(function () {
            return window.util.getRandomInt(-1, 1);
          });
          window.picture.delElements(pictureForDell);
          window.util.debounce(window.picture.render(newArrayRandom));
          break;
        case filterDefault:
          window.picture.delElements(pictureForDell);
          window.util.debounce(window.picture.render(data));
          break;
      }
    });
  };

  window.filter = {
    onImgFiltersForm: onImgFiltersForm
  };
})();
