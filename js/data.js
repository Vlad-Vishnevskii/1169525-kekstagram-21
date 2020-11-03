'use strict';

let offers = [];
const imgFilter = document.querySelector(`.img-filters`);
const pictureContainer = document.querySelector(`.pictures`);

imgFilter.classList.remove(`img-filters--inactive`);

const dataTransform = function (data) {
  data.forEach(function (item, index) {
    item.id = index;
  });
};

const successHandler = function (data) {
  offers = data;
  dataTransform(offers);
  window.picture.render(offers);
};

const errorHandler = function (errorMessage) {
  window.popup.error(errorMessage);
};

window.backend.downl(successHandler, errorHandler);

const renderSortedPictures = function (evt) {
  const target = evt.target.closest(`.img-filters__button`);
  if (target) {
    window.picture.remove();
    window.picture.render(window.filter(offers, target));
  }
};

const onFiltersClick = window.util.deboun(renderSortedPictures);

imgFilter.addEventListener(`click`, onFiltersClick);
pictureContainer.addEventListener(`click`, function (evt) {
  let target = evt.target.closest(`.picture`);
  if (target) {
    window.bigPicture.show(offers[target.dataset.id]);
  }
});
