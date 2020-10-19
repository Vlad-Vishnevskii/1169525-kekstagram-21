'use strict';

(function () {
  let offers = [];


  const successHandler = function (data) {
    offers = data;
    window.picture.render(offers);
    window.filter.onImgFiltersForm(offers);
    window.bigPicture.onPictureClick(offers);
  };

  const loadOffers = function () {
    window.backend.download(successHandler);
  };

  loadOffers();
})();
