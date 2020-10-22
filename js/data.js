'use strict';

(function () {
  let offers = [];
  const imgFilters = document.querySelector(`.img-filters`);

  const successHandler = function (data) {
    offers = data;
    window.picture.render(offers);
    window.picture.picturesBlock.addEventListener(`click`, function (evt) {
      window.bigPicture.showBigPhoto(offers, evt);
    });
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
