'use strict';

(function () {
  let offers = [];
  const imgFilters = document.querySelector(`.img-filters`);
  const pictures = document.querySelector(`.pictures`);

  const dataTransform = function (data) {
    data.forEach(function (item, index) {
      item.id = index;
    });
  };

  pictures.addEventListener(`click`, function (evt) {
    let target = evt.target;
    if (target.closest(`.picture`)) {
      if (target.classList.contains(`picture`)) {
        let element = evt.target;
        let img = element.querySelector(`.picture__img`);
        window.bigPicture.showBigPhoto(offers[img.dataset.id]);
      }
      window.bigPicture.showBigPhoto(offers[target.dataset.id]);
    }
  });

  const successHandler = function (data) {
    offers = data;
    dataTransform(offers);
    window.picture.render(offers);
  };

  const loadOffers = function () {
    window.backend.download(successHandler);
  };

  const onFiltersClick = function (evt) {
    const target = evt.target;
    if (target.closest(`.img-filters__button`)) {
      window.picture.activeFilter(target);
      window.picture.remove();
      window.picture.render(window.filter(offers, target));
    }
  };

  imgFilters.addEventListener(`click`, onFiltersClick);

  loadOffers();
})();
