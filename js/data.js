'use strict';

(function () {
  let offers = [];


  const successHandler = function (data) {
    offers = data;
    window.picture.render(offers);
    window.filter.onImgFiltersForm(offers);
    window.picture.picturesBlock.addEventListener(`click`, function (evt) {
      window.bigPicture.showBigPhoto(offers, evt);
    });
  };

  const loadOffers = function () {
    window.backend.download(successHandler);
  };

  loadOffers();
})();
