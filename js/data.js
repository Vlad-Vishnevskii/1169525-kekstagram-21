'use strict';

(function () {
  let offers = [];
  const imgFilters = document.querySelector(`.img-filters`);
  const pictures = document.querySelector(`.pictures`);

  imgFilters.classList.remove(`img-filters--inactive`);

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

  window.backend.download(successHandler, errorHandler);

  const onFiltersClick = function (evt) {
    const target = evt.target.closest(`.img-filters__button`);
    if (target) {
      window.picture.activeFilter(target);
      window.picture.remove();
      window.picture.render(window.filter(offers, target));
    }
  };

  imgFilters.addEventListener(`click`, onFiltersClick);
  pictures.addEventListener(`click`, function (evt) {
    let target = evt.target.closest(`.picture`);
    if (target) {
      window.bigPicture.show(offers[target.dataset.id]);
    }
  });
})();
